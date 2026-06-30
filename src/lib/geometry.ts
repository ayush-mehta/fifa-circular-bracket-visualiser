// Pure radial layout for the bracket. Computes screen positions for the 32 outer
// team flags and the 30 inner winner slots, plus the elbow connector path for
// every match. All angles are degrees measured clockwise from the top (12 o'clock).

import { MATCHES, MATCH_LIST, TEAM_ORDER } from './bracketState';
import type { RoundId } from './bracketState';

export const VIEW = 1000;
export const CX = VIEW / 2;
export const CY = VIEW / 2;

// Radius of the ring each round's winner sits on (R32 participants are the outer
// flags at TEAM_RADIUS; a match's winner is drawn one ring further in).
const TEAM_RADIUS = 468;
const WINNER_RADIUS: Record<RoundId, number> = {
  R32: 374,
  R16: 288,
  QF: 206,
  SF: 116,
  F: 0, // champion -> centre (handled by the Trophy component)
};

const TEAM_FLAG_R = 27;
const WINNER_FLAG_R: Record<RoundId, number> = { R32: 21, R16: 18, QF: 16, SF: 16, F: 34 };

export const TROPHY_RADIUS = 64;

// Angular spread: 16 teams per half across ~164°, leaving small gaps at the very
// top and bottom where the two halves meet.
const TOP_GAP = 8;
const SPAN = 180 - 2 * TOP_GAP;
const STEP = SPAN / 16;

function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function polar(r: number, deg: number) {
  return { x: CX + r * Math.sin(rad(deg)), y: CY - r * Math.cos(rad(deg)) };
}

// Angle of outer team at global index g (0..15 right half, 16..31 left half).
function rightAngle(i: number) {
  return TOP_GAP + (i + 0.5) * STEP;
}
function teamAngle(g: number): number {
  return g < 16 ? rightAngle(g) : 360 - rightAngle(g - 16);
}

// Angle of a match's winner node = midpoint of its two children's angles.
const angleCache: Record<string, number> = {};
function matchAngle(id: string): number {
  if (id in angleCache) return angleCache[id];
  const m = MATCHES[id];
  let a: number;
  if (m.childKind === 'team') {
    a = (teamAngle(2 * m.indexInRound) + teamAngle(2 * m.indexInRound + 1)) / 2;
  } else {
    a = (matchAngle(m.childA) + matchAngle(m.childB)) / 2;
  }
  angleCache[id] = a;
  return a;
}

export interface TeamSlot {
  globalIndex: number;
  teamId: string;
  matchId: string; // the R32 match this team contests
  side: 'L' | 'R';
  angle: number;
  x: number;
  y: number;
  flagR: number;
}

export interface WinnerSlot {
  matchId: string;
  round: RoundId;
  parentId: string | null; // match this winner advances into
  angle: number;
  x: number;
  y: number;
  flagR: number;
}

export const TEAM_SLOTS: TeamSlot[] = TEAM_ORDER.map((teamId, g) => {
  const angle = teamAngle(g);
  const p = polar(TEAM_RADIUS, angle);
  return {
    globalIndex: g,
    teamId,
    matchId: `r32-${Math.floor(g / 2)}`,
    side: g < 16 ? 'R' : 'L',
    angle,
    x: p.x,
    y: p.y,
    flagR: TEAM_FLAG_R,
  };
});

// All winner slots except the champion (centre), which the Trophy renders.
export const WINNER_SLOTS: WinnerSlot[] = MATCH_LIST.filter((m) => m.round !== 'F').map((m) => {
  const angle = matchAngle(m.id);
  const p = polar(WINNER_RADIUS[m.round], angle);
  return {
    matchId: m.id,
    round: m.round,
    parentId: m.parentId,
    angle,
    x: p.x,
    y: p.y,
    flagR: WINNER_FLAG_R[m.round],
  };
});

export const CHAMPION_FLAG_R = WINNER_FLAG_R.F;
export const TEAM_RING_RADIUS = TEAM_RADIUS;

// Position + angle of one of a match's two children (team or inner match).
function childPoint(matchId: string, which: 'A' | 'B') {
  const m = MATCHES[matchId];
  if (m.childKind === 'team') {
    const g = 2 * m.indexInRound + (which === 'A' ? 0 : 1);
    return { angle: teamAngle(g), ...polar(TEAM_RADIUS, teamAngle(g)) };
  }
  const childId = which === 'A' ? m.childA : m.childB;
  const angle = matchAngle(childId);
  return { angle, ...polar(WINNER_RADIUS[MATCHES[childId].round], angle) };
}

/** SVG path for a match's connector: radial stubs from each child to the winner
 *  ring, joined by a short arc through the winner node. The final is special:
 *  the two finalists run straight in to the central trophy. */
export function connectorPath(matchId: string): string {
  const m = MATCHES[matchId];
  const a = childPoint(matchId, 'A');
  const b = childPoint(matchId, 'B');

  if (m.round === 'F') {
    return `M ${a.x} ${a.y} L ${CX} ${CY} M ${b.x} ${b.y} L ${CX} ${CY}`;
  }

  const R = WINNER_RADIUS[m.round];
  const kneeA = polar(R, a.angle);
  const kneeB = polar(R, b.angle);
  const delta = (((b.angle - a.angle) % 360) + 360) % 360;
  const sweep = delta < 180 ? 1 : 0;
  return `M ${a.x} ${a.y} L ${kneeA.x} ${kneeA.y} A ${R} ${R} 0 0 ${sweep} ${kneeB.x} ${kneeB.y} L ${b.x} ${b.y}`;
}
