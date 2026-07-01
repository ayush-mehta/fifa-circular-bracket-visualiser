// The knockout tree (31 matches) + the prediction state operations.
//
// Tree shape (kept left/right separated until the final):
//   R32  16 matches  r32-0..15   (0..7 right half, 8..15 left half)
//   R16   8 matches  r16-0..7    children r32-2q / r32-2q+1
//   QF    4 matches  qf-0..3     children r16-2k / r16-2k+1
//   SF    2 matches  sf-0..1     children qf-2s / qf-2s+1   (winners are finalists)
//   F     1 match    final       children sf-0 / sf-1       (winner is champion)

import { R32_SEED } from '../data/bracket';
import type { R32Seed } from '../data/bracket';

export type RoundId = 'R32' | 'R16' | 'QF' | 'SF' | 'F';

export const ROUNDS: { id: RoundId; label: string; matches: number }[] = [
  { id: 'R32', label: 'Round of 32', matches: 16 },
  { id: 'R16', label: 'Round of 16', matches: 8 },
  { id: 'QF', label: 'Quarter-finals', matches: 4 },
  { id: 'SF', label: 'Semi-finals', matches: 2 },
  { id: 'F', label: 'Final', matches: 1 },
];

export interface MatchNode {
  id: string;
  round: RoundId;
  indexInRound: number;
  childKind: 'team' | 'match'; // what the two children are
  childA: string; // team id (R32) or child match id — the "upper" child
  childB: string;
  parentId: string | null;
  seed?: R32Seed; // only for R32 matches
}

// Global team order (32): match m holds teams at global indices 2m, 2m+1.
export const TEAM_ORDER: string[] = R32_SEED.flatMap((m) => [m.top, m.bottom]);

// ---- Build the tree ----------------------------------------------------------

const MATCHES: Record<string, MatchNode> = {};

function add(node: MatchNode) {
  MATCHES[node.id] = node;
}

// R32 — leaves
R32_SEED.forEach((seed, m) => {
  add({
    id: seed.id,
    round: 'R32',
    indexInRound: m,
    childKind: 'team',
    childA: seed.top,
    childB: seed.bottom,
    parentId: `r16-${Math.floor(m / 2)}`,
    seed,
  });
});

function buildRound(round: RoundId, count: number, childPrefix: string, parentPrefix: string | null) {
  for (let i = 0; i < count; i++) {
    add({
      id: `${round === 'F' ? 'final' : roundPrefix(round)}${round === 'F' ? '' : '-' + i}`,
      round,
      indexInRound: i,
      childKind: 'match',
      childA: `${childPrefix}-${2 * i}`,
      childB: `${childPrefix}-${2 * i + 1}`,
      // The final has the bare id 'final' (no index), so SF matches parent to it directly.
      parentId: parentPrefix === 'final' ? 'final' : parentPrefix ? `${parentPrefix}-${Math.floor(i / 2)}` : null,
    });
  }
}

function roundPrefix(round: RoundId): string {
  return { R32: 'r32', R16: 'r16', QF: 'qf', SF: 'sf', F: 'final' }[round];
}

buildRound('R16', 8, 'r32', 'qf');
buildRound('QF', 4, 'r16', 'sf');
buildRound('SF', 2, 'qf', 'final');
// Final (parentless)
add({
  id: 'final',
  round: 'F',
  indexInRound: 0,
  childKind: 'match',
  childA: 'sf-0',
  childB: 'sf-1',
  parentId: null,
});

export { MATCHES };
export const MATCH_LIST: MatchNode[] = Object.values(MATCHES);

export function getMatch(id: string): MatchNode {
  return MATCHES[id];
}

// ---- Prediction state --------------------------------------------------------

export type Winners = Record<string, string | null>;

/** Winners map seeded with only the real, already-played results. */
export function seedWinners(): Winners {
  const w: Winners = {};
  for (const m of R32_SEED) {
    if (m.result) w[m.id] = m.result.winner;
  }
  return w;
}

/** The two team ids contesting a match (either may be null for future rounds). */
export function participants(matchId: string, winners: Winners): [string | null, string | null] {
  const m = MATCHES[matchId];
  if (m.childKind === 'team') return [m.childA, m.childB];
  return [winners[m.childA] ?? null, winners[m.childB] ?? null];
}

/** True if `teamId` is one of the two teams contesting `matchId`. */
export function isParticipant(matchId: string, teamId: string, winners: Winners): boolean {
  const [a, b] = participants(matchId, winners);
  return a === teamId || b === teamId;
}

/**
 * Record a winner for a match, cascading: if this overwrites a previous winner,
 * clear that team from every ancestor it had advanced into (it can no longer be
 * up there). Returns a new Winners object (never mutates).
 */
export function setWinner(winners: Winners, matchId: string, teamId: string): Winners {
  if (winners[matchId] === teamId) return winners;
  const next: Winners = { ...winners };
  const replaced = next[matchId] ?? null;
  next[matchId] = teamId;
  let cur = MATCHES[matchId].parentId;
  while (cur && replaced && next[cur] === replaced) {
    next[cur] = null;
    cur = MATCHES[cur].parentId;
  }
  return next;
}

export const CHAMPION_MATCH = 'final';

export function champion(winners: Winners): string | null {
  return winners[CHAMPION_MATCH] ?? null;
}
