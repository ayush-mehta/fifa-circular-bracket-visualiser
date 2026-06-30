// Seed for the 2026 FIFA World Cup Round of 32 — confirmed from the finalised
// bracket. Order is significant: the 16 matches are laid out RIGHT half (0–7,
// top→bottom) then LEFT half (8–15, top→bottom), so positions 2m / 2m+1 are the
// two teams of match m. This drives both the binary tree and the radial layout.
//
// Pre-filled results reflect games already played as of 2026-06-30. Remaining
// matches are left open for the user to predict.

export interface SeedResult {
  winner: string; // team id that advanced
  scoreTop: number;
  scoreBottom: number;
  penalties?: [number, number]; // [top, bottom] shootout scores, if drawn
  note?: string; // short context line for the tooltip
}

export interface R32Seed {
  id: string; // 'r32-0' .. 'r32-15'
  top: string; // team id rendered first (clockwise/upper)
  bottom: string; // team id rendered second
  kickoffUTC: string; // ISO 8601 UTC instant of kickoff (formatted to IST for display)
  venue: string; // host city
  result?: SeedResult; // present iff the match has been played
}

// kickoffUTC = the broadcast kickoff (originally given in ET / EDT = UTC−4),
// stored as a UTC instant so it can be rendered in IST (UTC+5:30) with correct
// date/weekday rollover.
export const R32_SEED: R32Seed[] = [
  // ---- Right half (top -> bottom) ----
  {
    id: 'r32-0', top: 'BRA', bottom: 'JPN',
    kickoffUTC: '2026-06-29T21:00:00Z', venue: 'Houston',
    result: { winner: 'BRA', scoreTop: 2, scoreBottom: 1 },
  },
  { id: 'r32-1', top: 'CIV', bottom: 'NOR', kickoffUTC: '2026-06-30T17:00:00Z', venue: 'Arlington, TX' },
  { id: 'r32-2', top: 'MEX', bottom: 'ECU', kickoffUTC: '2026-07-01T01:00:00Z', venue: 'Mexico City' },
  { id: 'r32-3', top: 'ENG', bottom: 'COD', kickoffUTC: '2026-07-01T16:00:00Z', venue: 'Atlanta' },
  { id: 'r32-4', top: 'ARG', bottom: 'CPV', kickoffUTC: '2026-07-03T22:00:00Z', venue: 'Miami Gardens' },
  { id: 'r32-5', top: 'AUS', bottom: 'EGY', kickoffUTC: '2026-07-03T18:00:00Z', venue: 'Arlington, TX' },
  { id: 'r32-6', top: 'SUI', bottom: 'ALG', kickoffUTC: '2026-07-03T03:00:00Z', venue: 'Vancouver' },
  { id: 'r32-7', top: 'COL', bottom: 'GHA', kickoffUTC: '2026-07-04T01:30:00Z', venue: 'Kansas City' },
  // ---- Left half (top -> bottom) ----
  {
    id: 'r32-8', top: 'GER', bottom: 'PAR',
    kickoffUTC: '2026-06-30T01:00:00Z', venue: 'Boston',
    result: { winner: 'PAR', scoreTop: 1, scoreBottom: 1, penalties: [3, 4], note: 'Paraguay won 4–3 on penalties' },
  },
  { id: 'r32-9', top: 'FRA', bottom: 'SWE', kickoffUTC: '2026-06-30T21:00:00Z', venue: 'East Rutherford, NJ' },
  {
    id: 'r32-10', top: 'RSA', bottom: 'CAN',
    kickoffUTC: '2026-06-28T17:00:00Z', venue: 'Los Angeles',
    result: { winner: 'CAN', scoreTop: 0, scoreBottom: 1 },
  },
  {
    id: 'r32-11', top: 'NED', bottom: 'MAR',
    kickoffUTC: '2026-06-29T17:00:00Z', venue: 'Monterrey',
    result: { winner: 'MAR', scoreTop: 1, scoreBottom: 1, penalties: [2, 3], note: 'Morocco won 3–2 on penalties' },
  },
  { id: 'r32-12', top: 'POR', bottom: 'CRO', kickoffUTC: '2026-07-02T23:00:00Z', venue: 'Toronto' },
  { id: 'r32-13', top: 'ESP', bottom: 'AUT', kickoffUTC: '2026-07-02T19:00:00Z', venue: 'Inglewood, CA' },
  { id: 'r32-14', top: 'USA', bottom: 'BIH', kickoffUTC: '2026-07-02T00:00:00Z', venue: 'Santa Clara, CA' },
  { id: 'r32-15', top: 'BEL', bottom: 'SEN', kickoffUTC: '2026-07-01T20:00:00Z', venue: 'Seattle' },
];

export const TOURNAMENT_TITLE = 'FIFA World Cup 2026';
export const TOURNAMENT_SUBTITLE = 'Round of 32 → Final';
