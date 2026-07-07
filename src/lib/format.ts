import { FIXTURES, RESULTS } from '../data/bracket';
import { TEAMS } from '../data/teams';

const IST_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

/** Fixture line for any match in IST, e.g.
 *  "Sun 28 Jun · 10:30 PM IST · Los Angeles". Returns null if the match has no
 *  scheduled fixture. */
export function formatFixture(matchId: string): string | null {
  const f = FIXTURES[matchId];
  if (!f) return null;
  const p: Record<string, string> = {};
  for (const part of IST_FORMAT.formatToParts(new Date(f.kickoffUTC))) p[part.type] = part.value;
  const date = `${p.weekday} ${p.day} ${p.month}`;
  const time = `${p.hour}:${p.minute} ${p.dayPeriod} IST`;
  return `${date} · ${time} · ${f.venue}`;
}

/** Human-readable scoreline for a completed match, e.g. "Brazil 2–1 Japan" or
 *  "Germany 1–1 Paraguay · Paraguay won 4–3 on penalties". Null if not played. */
export function formatResult(matchId: string): string | null {
  const r = RESULTS[matchId];
  if (!r) return null;
  const a = TEAMS[r.teams[0]].name;
  const b = TEAMS[r.teams[1]].name;
  const base = `${a} ${r.scores[0]}–${r.scores[1]} ${b}`;
  return r.note ? `${base} · ${r.note}` : base;
}
