import { R32_SEED } from '../data/bracket';
import { TEAMS } from '../data/teams';

const seedById: Record<string, (typeof R32_SEED)[number]> = {};
for (const m of R32_SEED) seedById[m.id] = m;

/** Human-readable scoreline for a completed R32 match, e.g.
 *  "Brazil 2–1 Japan" or "Germany 1–1 Paraguay · Paraguay won 4–3 on penalties". */
export function formatResult(matchId: string): string | null {
  const m = seedById[matchId];
  if (!m?.result) return null;
  const { scoreTop, scoreBottom, note } = m.result;
  const top = TEAMS[m.top].name;
  const bottom = TEAMS[m.bottom].name;
  const base = `${top} ${scoreTop}–${scoreBottom} ${bottom}`;
  return note ? `${base} · ${note}` : base;
}
