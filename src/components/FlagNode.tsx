import clsx from 'clsx';
import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import { getTeam } from '../data/teams';
import { flagUrl } from '../data/flags';

export interface FlagNodeProps {
  teamId: string | null;
  x: number;
  y: number;
  r: number;
  clickable: boolean;
  highlighted: boolean;
  dimmed: boolean;
  locked: boolean;
  champion?: boolean;
  ariaLabel: string;
  onPick?: () => void;
  onEnter?: (e: MouseEvent | FocusEvent) => void;
  onMove?: (e: MouseEvent) => void;
  onLeave?: () => void;
}

export function FlagNode({
  teamId,
  x,
  y,
  r,
  clickable,
  highlighted,
  dimmed,
  locked,
  champion,
  ariaLabel,
  onPick,
  onEnter,
  onMove,
  onLeave,
}: FlagNodeProps) {
  const team = getTeam(teamId);

  // Empty slot: a small hollow dot.
  if (!team) {
    return <circle cx={x} cy={y} r={5} className="slot-empty" />;
  }

  const href = flagUrl(team.iso2);
  const clipId = `clip-${Math.round(x)}-${Math.round(y)}-${Math.round(r)}`;

  const handleKey = (e: KeyboardEvent) => {
    if (!clickable || !onPick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPick();
    }
  };

  return (
    <g
      className={clsx('flag-node', {
        clickable,
        highlighted,
        dimmed,
        locked,
        champion,
      })}
      role={clickable ? 'button' : 'img'}
      aria-label={ariaLabel}
      tabIndex={clickable ? 0 : -1}
      onClick={clickable ? onPick : undefined}
      onKeyDown={handleKey}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <title>{ariaLabel}</title>
      <clipPath id={clipId}>
        <circle cx={x} cy={y} r={r} />
      </clipPath>
      {href ? (
        <image
          href={href}
          x={x - r}
          y={y - r}
          width={r * 2}
          height={r * 2}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid slice"
        />
      ) : (
        <circle cx={x} cy={y} r={r} className="flag-missing" />
      )}
      <circle cx={x} cy={y} r={r} className="flag-ring" fill="none" />
    </g>
  );
}
