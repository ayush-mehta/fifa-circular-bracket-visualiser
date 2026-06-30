import clsx from 'clsx';
import { connectorPath } from '../lib/geometry';

export function MatchConnector({
  matchId,
  highlighted,
  dimmed,
}: {
  matchId: string;
  highlighted: boolean;
  dimmed: boolean;
}) {
  return (
    <path
      d={connectorPath(matchId)}
      className={clsx('connector', { highlighted, dimmed })}
      fill="none"
    />
  );
}
