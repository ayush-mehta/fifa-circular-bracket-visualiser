// Seed for the 2026 FIFA World Cup Round of 32 — confirmed from the finalised
// bracket. Order is significant: the 16 matches are laid out RIGHT half (0–7,
// top→bottom) then LEFT half (8–15, top→bottom), so positions 2m / 2m+1 are the
// two teams of match m. This drives both the binary tree and the radial layout.
//
// Pre-filled results reflect games already played (through 2026-06-30). Remaining
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
  result?: SeedResult; // present iff the match has been played
}

export const R32_SEED: R32Seed[] = [
  // ---- Right half (top -> bottom) ----
  { id: 'r32-0', top: 'BRA', bottom: 'JPN', result: { winner: 'BRA', scoreTop: 2, scoreBottom: 1 } },
  { id: 'r32-1', top: 'CIV', bottom: 'NOR', result: { winner: 'NOR', scoreTop: 1, scoreBottom: 2 } },
  { id: 'r32-2', top: 'MEX', bottom: 'ECU', result: { winner: 'MEX', scoreTop: 2, scoreBottom: 0 } },
  { id: 'r32-3', top: 'ENG', bottom: 'COD' },
  { id: 'r32-4', top: 'ARG', bottom: 'CPV' },
  { id: 'r32-5', top: 'AUS', bottom: 'EGY' },
  { id: 'r32-6', top: 'SUI', bottom: 'ALG' },
  { id: 'r32-7', top: 'COL', bottom: 'GHA' },
  // ---- Left half (top -> bottom) ----
  {
    id: 'r32-8', top: 'GER', bottom: 'PAR',
    result: { winner: 'PAR', scoreTop: 1, scoreBottom: 1, penalties: [3, 4], note: 'Paraguay won 4–3 on penalties' },
  },
  { id: 'r32-9', top: 'FRA', bottom: 'SWE', result: { winner: 'FRA', scoreTop: 3, scoreBottom: 0 } },
  { id: 'r32-10', top: 'RSA', bottom: 'CAN', result: { winner: 'CAN', scoreTop: 0, scoreBottom: 1 } },
  {
    id: 'r32-11', top: 'NED', bottom: 'MAR',
    result: { winner: 'MAR', scoreTop: 1, scoreBottom: 1, penalties: [2, 3], note: 'Morocco won 3–2 on penalties' },
  },
  { id: 'r32-12', top: 'POR', bottom: 'CRO' },
  { id: 'r32-13', top: 'ESP', bottom: 'AUT' },
  { id: 'r32-14', top: 'USA', bottom: 'BIH' },
  { id: 'r32-15', top: 'BEL', bottom: 'SEN' },
];

export interface Fixture {
  kickoffUTC: string; // ISO 8601 UTC instant of kickoff (rendered in IST for display)
  venue: string; // host city
}

// Date + venue for every match in the bracket, keyed by match id. Kickoffs were
// published in ET (EDT = UTC−4) and are stored as UTC instants so they render in
// IST with correct date rollover. R32/R16 map exactly to the official schedule;
// QF/SF/Final are the real fixtures for those rounds (the circular layout pairs
// the two semi-finals left/right rather than by the official match numbers, but
// every round's date/venue is a genuine scheduled fixture).
export const FIXTURES: Record<string, Fixture> = {
  // ---- Round of 32 ----
  'r32-0': { kickoffUTC: '2026-06-29T21:00:00Z', venue: 'Houston' },
  'r32-1': { kickoffUTC: '2026-06-30T17:00:00Z', venue: 'Arlington, TX' },
  'r32-2': { kickoffUTC: '2026-07-01T01:00:00Z', venue: 'Mexico City' },
  'r32-3': { kickoffUTC: '2026-07-01T16:00:00Z', venue: 'Atlanta' },
  'r32-4': { kickoffUTC: '2026-07-03T22:00:00Z', venue: 'Miami Gardens' },
  'r32-5': { kickoffUTC: '2026-07-03T18:00:00Z', venue: 'Arlington, TX' },
  'r32-6': { kickoffUTC: '2026-07-03T03:00:00Z', venue: 'Vancouver' },
  'r32-7': { kickoffUTC: '2026-07-04T01:30:00Z', venue: 'Kansas City' },
  'r32-8': { kickoffUTC: '2026-06-30T01:00:00Z', venue: 'Boston' },
  'r32-9': { kickoffUTC: '2026-06-30T21:00:00Z', venue: 'East Rutherford, NJ' },
  'r32-10': { kickoffUTC: '2026-06-28T17:00:00Z', venue: 'Los Angeles' },
  'r32-11': { kickoffUTC: '2026-06-29T17:00:00Z', venue: 'Monterrey' },
  'r32-12': { kickoffUTC: '2026-07-02T23:00:00Z', venue: 'Toronto' },
  'r32-13': { kickoffUTC: '2026-07-02T19:00:00Z', venue: 'Inglewood, CA' },
  'r32-14': { kickoffUTC: '2026-07-02T00:00:00Z', venue: 'Santa Clara, CA' },
  'r32-15': { kickoffUTC: '2026-07-01T20:00:00Z', venue: 'Seattle' },
  // ---- Round of 16 (r16-q feeds from r32-2q / r32-2q+1) ----
  'r16-0': { kickoffUTC: '2026-07-05T20:00:00Z', venue: 'East Rutherford, NJ' }, // Brazil/Norway side
  'r16-1': { kickoffUTC: '2026-07-06T00:00:00Z', venue: 'Mexico City' },
  'r16-2': { kickoffUTC: '2026-07-07T16:00:00Z', venue: 'Atlanta' },
  'r16-3': { kickoffUTC: '2026-07-07T20:00:00Z', venue: 'Vancouver' },
  'r16-4': { kickoffUTC: '2026-07-04T21:00:00Z', venue: 'Philadelphia' },
  'r16-5': { kickoffUTC: '2026-07-04T17:00:00Z', venue: 'Houston' },
  'r16-6': { kickoffUTC: '2026-07-06T19:00:00Z', venue: 'Arlington, TX' },
  'r16-7': { kickoffUTC: '2026-07-07T00:00:00Z', venue: 'Seattle' },
  // ---- Quarter-finals ----
  'qf-0': { kickoffUTC: '2026-07-11T21:00:00Z', venue: 'Miami Gardens' },
  'qf-1': { kickoffUTC: '2026-07-12T01:00:00Z', venue: 'Kansas City' },
  'qf-2': { kickoffUTC: '2026-07-10T19:00:00Z', venue: 'Inglewood, CA' },
  'qf-3': { kickoffUTC: '2026-07-09T20:00:00Z', venue: 'Foxborough, MA' },
  // ---- Semi-finals ----
  'sf-0': { kickoffUTC: '2026-07-14T19:00:00Z', venue: 'Arlington, TX' },
  'sf-1': { kickoffUTC: '2026-07-15T19:00:00Z', venue: 'Atlanta' },
  // ---- Final ----
  final: { kickoffUTC: '2026-07-19T19:00:00Z', venue: 'East Rutherford, NJ' },
};

export const TOURNAMENT_TITLE = 'FIFA World Cup 2026';
export const TOURNAMENT_SUBTITLE = 'Round of 32 → Final';
