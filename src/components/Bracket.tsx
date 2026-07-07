import { useRef, useState } from 'react';
import type { FocusEvent, MouseEvent } from 'react';
import { TEAM_SLOTS, VIEW, WINNER_SLOTS } from '../lib/geometry';
import { MATCH_LIST, isParticipant } from '../lib/bracketState';
import type { Winners } from '../lib/bracketState';
import { getTeam } from '../data/teams';
import { formatFixture, formatResult } from '../lib/format';
import { FlagNode } from './FlagNode';
import { MatchConnector } from './MatchConnector';
import { Trophy } from './Trophy';
import { Tooltip } from './Tooltip';

interface TipState {
  name: string;
  fixture: string | null;
  result: string | null;
  x: number;
  y: number;
}

interface BracketProps {
  winners: Winners;
  highlightTeam: string | null;
  setHighlightTeam: (t: string | null) => void;
  pick: (matchId: string, teamId: string) => void;
  isLocked: (matchId: string) => boolean;
  champion: string | null;
}

export function Bracket({
  winners,
  highlightTeam,
  setHighlightTeam,
  pick,
  isLocked,
  champion,
}: BracketProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<TipState | null>(null);

  const enter =
    (teamId: string, matchId: string) => (e: MouseEvent | FocusEvent) => {
      const team = getTeam(teamId);
      if (!team) return;
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const tRect = (e.currentTarget as Element).getBoundingClientRect();
      setHighlightTeam(teamId);
      setTip({
        name: team.name,
        fixture: formatFixture(matchId),
        result: formatResult(matchId),
        x: tRect.left + tRect.width / 2 - cRect.left,
        y: tRect.top - cRect.top,
      });
    };

  const leave = () => {
    setHighlightTeam(null);
    setTip(null);
  };

  return (
    <div className="bracket-container" ref={containerRef}>
      <svg
        className="bracket-svg"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        preserveAspectRatio="xMidYMid meet"
        role="group"
        aria-label="FIFA World Cup 2026 circular knockout bracket"
      >
        {/* Connectors (behind the nodes) */}
        <g className="connectors">
          {MATCH_LIST.map((m) => (
            <MatchConnector
              key={m.id}
              matchId={m.id}
              highlighted={!!highlightTeam && isParticipant(m.id, highlightTeam, winners)}
              dimmed={!!highlightTeam && !isParticipant(m.id, highlightTeam, winners)}
            />
          ))}
        </g>

        {/* Inner winner slots */}
        <g className="winner-slots">
          {WINNER_SLOTS.map((s) => {
            const teamId = winners[s.matchId] ?? null;
            // Locked once the match this team feeds into has a real, played result.
            const parentLocked = s.parentId ? isLocked(s.parentId) : false;
            const clickable = !!teamId && !!s.parentId && !parentLocked;
            return (
              <FlagNode
                key={s.matchId}
                teamId={teamId}
                x={s.x}
                y={s.y}
                r={s.flagR}
                clickable={clickable}
                highlighted={!!highlightTeam && teamId === highlightTeam}
                dimmed={!!highlightTeam && teamId !== highlightTeam}
                locked={parentLocked}
                ariaLabel={teamId ? `${getTeam(teamId)!.name}, advance to next round` : 'Undecided'}
                onPick={clickable && teamId && s.parentId ? () => pick(s.parentId!, teamId) : undefined}
                // Show the fixture for the round this team has advanced INTO (its
                // next match), not the match it just won.
                onEnter={teamId && s.parentId ? enter(teamId, s.parentId) : undefined}
                onLeave={teamId ? leave : undefined}
              />
            );
          })}
        </g>

        {/* Trophy / champion at the centre */}
        <Trophy champion={champion} />

        {/* Outer team flags (Round of 32) */}
        <g className="team-slots">
          {TEAM_SLOTS.map((s) => {
            const locked = isLocked(s.matchId);
            const result = formatResult(s.matchId);
            const team = getTeam(s.teamId)!;
            return (
              <FlagNode
                key={s.globalIndex}
                teamId={s.teamId}
                x={s.x}
                y={s.y}
                r={s.flagR}
                clickable={!locked}
                highlighted={highlightTeam === s.teamId}
                dimmed={!!highlightTeam && highlightTeam !== s.teamId}
                locked={locked}
                ariaLabel={`${team.name}${result ? `, ${result}` : ''}`}
                onPick={() => pick(s.matchId, s.teamId)}
                onEnter={enter(s.teamId, s.matchId)}
                onLeave={leave}
              />
            );
          })}
        </g>
      </svg>

      <Tooltip tip={tip} />
    </div>
  );
}
