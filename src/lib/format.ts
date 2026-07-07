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

const IST_DATE = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

// Rounds from outermost to the final, with how many matches each has.
const ROUND_PROGRESS = [
  { match: (id: string) => id.startsWith('r32-'), label: 'Round of 32', count: 16 },
  { match: (id: string) => id.startsWith('r16-'), label: 'Round of 16', count: 8 },
  { match: (id: string) => id.startsWith('qf-'), label: 'Quarter-finals', count: 4 },
  { match: (id: string) => id.startsWith('sf-'), label: 'Semi-finals', count: 2 },
  { match: (id: string) => id === 'final', label: 'Final', count: 1 },
];

/** Derived status line for the footer, e.g. "Round of 16 under way · results
 *  through 7 Jul 2026". Recomputed from RESULTS/FIXTURES, so it tracks the seed. */
export function resultsSummary(): string {
  const ids = Object.keys(RESULTS);
  if (ids.length === 0) return 'Bracket set · no results yet';

  // Deepest round that has any result, and whether it is complete.
  let stage = '';
  for (const round of ROUND_PROGRESS) {
    const played = ids.filter(round.match).length;
    if (played === 0) continue;
    if (round.label === 'Final' && played >= round.count) stage = 'Champions crowned';
    else stage = `${round.label} ${played >= round.count ? 'complete' : 'under way'}`;
  }

  // Latest played date (ISO UTC sorts chronologically), shown in IST.
  const latest = ids
    .map((id) => FIXTURES[id]?.kickoffUTC)
    .filter((v): v is string => Boolean(v))
    .sort()
    .at(-1);
  const through = latest ? ` · results through ${IST_DATE.format(new Date(latest))}` : '';
  return `${stage}${through}`;
}

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
