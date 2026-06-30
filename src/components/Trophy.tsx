import { getTeam } from '../data/teams';
import { flagUrl } from '../data/flags';
import { CHAMPION_FLAG_R, CX, CY } from '../lib/geometry';

// Simplified World Cup trophy silhouette, drawn around the local origin (0,0).
const BOWL_PATH =
  'M-26,-36 L26,-36 L22,-4 Q0,16 -22,-4 Z M-26,-32 q-17,2 -15,17 q2,11 15,9 M26,-32 q17,2 15,17 q-2,11 -15,9';

function TrophyMark({ className }: { className: string }) {
  return (
    <g className={className}>
      <path d={BOWL_PATH} fill="none" />
      <rect x={-5} y={14} width={10} height={16} rx={1} />
      <rect x={-19} y={29} width={38} height={8} rx={2} />
      <rect x={-26} y={37} width={52} height={9} rx={2} />
    </g>
  );
}

export function Trophy({ champion }: { champion: string | null }) {
  const team = getTeam(champion);

  if (!team) {
    return (
      <g transform={`translate(${CX} ${CY})`}>
        <TrophyMark className="trophy" />
      </g>
    );
  }

  const href = flagUrl(team.iso2);
  const r = CHAMPION_FLAG_R;
  const clipId = 'clip-champion';

  return (
    <g className="champion-group">
      <circle cx={CX} cy={CY} r={r + 14} className="champion-glow" />
      <clipPath id={clipId}>
        <circle cx={CX} cy={CY} r={r} />
      </clipPath>
      {href && (
        <image
          href={href}
          x={CX - r}
          y={CY - r}
          width={r * 2}
          height={r * 2}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      <circle cx={CX} cy={CY} r={r} className="champion-ring" fill="none" />
      <g transform={`translate(${CX} ${CY - 60}) scale(0.4)`}>
        <TrophyMark className="trophy champion-trophy" />
      </g>
      <text x={CX} y={CY + r + 26} className="champion-label" textAnchor="middle">
        CHAMPION
      </text>
      <text x={CX} y={CY + r + 48} className="champion-name" textAnchor="middle">
        {team.name}
      </text>
    </g>
  );
}
