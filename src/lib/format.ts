import { R32_SEED } from '../data/bracket';
import { TEAMS } from '../data/teams';

const seedById: Record<string, (typeof R32_SEED)[number]> = {};
for (const m of R32_SEED) seedById[m.id] = m;

const IST_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

/** Fixture line for an R32 match in IST, e.g.
 *  "Sun 28 Jun · 10:30 PM IST · Los Angeles". Returns null for later rounds,
 *  which have no scheduled kickoff in the seed. */
export function formatFixture(matchId: string): string | null {
  const m = seedById[matchId];
  if (!m?.kickoffUTC) return null;
  const p: Record<string, string> = {};
  for (const part of IST_FORMAT.formatToParts(new Date(m.kickoffUTC))) p[part.type] = part.value;
  const date = `${p.weekday} ${p.day} ${p.month}`;
  const time = `${p.hour}:${p.minute} ${p.dayPeriod} IST`;
  return `${date} · ${time} · ${m.venue}`;
}

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
