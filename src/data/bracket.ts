// Seed for the 2026 FIFA World Cup knockout bracket.
//
// R32_SEED fixes the Round of 32 pairings + layout order: the 16 matches are laid
// out RIGHT half (0–7, top→bottom) then LEFT half (8–15, top→bottom), so positions
// 2m / 2m+1 are the two teams of match m. This drives the binary tree and radial
// layout. RESULTS holds played outcomes for ANY match (R32, R16, …); FIXTURES holds
// date/venue for every match. Anything without a result is open to predict.

export interface R32Seed {
  id: string; // 'r32-0' .. 'r32-15'
  top: string; // team id rendered first (clockwise/upper)
  bottom: string; // team id rendered second
}

export const R32_SEED: R32Seed[] = [
  // ---- Right half (top -> bottom) ----
  { id: 'r32-0', top: 'BRA', bottom: 'JPN' },
  { id: 'r32-1', top: 'CIV', bottom: 'NOR' },
  { id: 'r32-2', top: 'MEX', bottom: 'ECU' },
  { id: 'r32-3', top: 'ENG', bottom: 'COD' },
  { id: 'r32-4', top: 'ARG', bottom: 'CPV' },
  { id: 'r32-5', top: 'AUS', bottom: 'EGY' },
  { id: 'r32-6', top: 'SUI', bottom: 'ALG' },
  { id: 'r32-7', top: 'COL', bottom: 'GHA' },
  // ---- Left half (top -> bottom) ----
  { id: 'r32-8', top: 'GER', bottom: 'PAR' },
  { id: 'r32-9', top: 'FRA', bottom: 'SWE' },
  { id: 'r32-10', top: 'RSA', bottom: 'CAN' },
  { id: 'r32-11', top: 'NED', bottom: 'MAR' },
  { id: 'r32-12', top: 'POR', bottom: 'CRO' },
  { id: 'r32-13', top: 'ESP', bottom: 'AUT' },
  { id: 'r32-14', top: 'USA', bottom: 'BIH' },
  { id: 'r32-15', top: 'BEL', bottom: 'SEN' },
];

export interface MatchResult {
  teams: [string, string]; // the two participants, in display order
  scores: [number, number]; // goals for teams[0], teams[1] (incl. extra time)
  winner: string; // team id that advanced
  penalties?: [number, number]; // shootout goals for teams[0], teams[1], if drawn
  note?: string; // short context line, e.g. 'after extra time'
}

// Played results, keyed by match id. Seeding a winner here pre-fills the bracket
// and locks the match (unless what-if mode is on).
export const RESULTS: Record<string, MatchResult> = {
  // ---- Round of 32 (complete) ----
  'r32-0': { teams: ['BRA', 'JPN'], scores: [2, 1], winner: 'BRA' },
  'r32-1': { teams: ['CIV', 'NOR'], scores: [1, 2], winner: 'NOR' },
  'r32-2': { teams: ['MEX', 'ECU'], scores: [2, 0], winner: 'MEX' },
  'r32-3': { teams: ['ENG', 'COD'], scores: [2, 1], winner: 'ENG' },
  'r32-4': { teams: ['ARG', 'CPV'], scores: [3, 2], winner: 'ARG', note: 'after extra time' },
  'r32-5': { teams: ['AUS', 'EGY'], scores: [1, 1], penalties: [2, 4], winner: 'EGY', note: 'Egypt won 4–2 on penalties' },
  'r32-6': { teams: ['SUI', 'ALG'], scores: [2, 0], winner: 'SUI' },
  'r32-7': { teams: ['COL', 'GHA'], scores: [1, 0], winner: 'COL' },
  'r32-8': { teams: ['GER', 'PAR'], scores: [1, 1], penalties: [3, 4], winner: 'PAR', note: 'Paraguay won 4–3 on penalties' },
  'r32-9': { teams: ['FRA', 'SWE'], scores: [3, 0], winner: 'FRA' },
  'r32-10': { teams: ['RSA', 'CAN'], scores: [0, 1], winner: 'CAN' },
  'r32-11': { teams: ['NED', 'MAR'], scores: [1, 1], penalties: [2, 3], winner: 'MAR', note: 'Morocco won 3–2 on penalties' },
  'r32-12': { teams: ['POR', 'CRO'], scores: [2, 1], winner: 'POR' },
  'r32-13': { teams: ['ESP', 'AUT'], scores: [3, 0], winner: 'ESP' },
  'r32-14': { teams: ['USA', 'BIH'], scores: [2, 0], winner: 'USA' },
  'r32-15': { teams: ['BEL', 'SEN'], scores: [3, 2], winner: 'BEL', note: 'after extra time' },
  // ---- Round of 16 (complete) ----
  'r16-0': { teams: ['BRA', 'NOR'], scores: [0, 2], winner: 'NOR' },
  'r16-1': { teams: ['MEX', 'ENG'], scores: [2, 3], winner: 'ENG' },
  'r16-2': { teams: ['ARG', 'EGY'], scores: [3, 2], winner: 'ARG' },
  'r16-3': { teams: ['SUI', 'COL'], scores: [0, 0], penalties: [4, 3], winner: 'SUI', note: 'Switzerland won 4–3 on penalties' },
  'r16-4': { teams: ['PAR', 'FRA'], scores: [0, 1], winner: 'FRA' },
  'r16-5': { teams: ['CAN', 'MAR'], scores: [0, 3], winner: 'MAR' },
  'r16-6': { teams: ['POR', 'ESP'], scores: [0, 1], winner: 'ESP' },
  'r16-7': { teams: ['USA', 'BEL'], scores: [1, 4], winner: 'BEL' },
  // ---- Quarter-finals (complete) ----
  'qf-0': { teams: ['NOR', 'ENG'], scores: [1, 2], winner: 'ENG', note: 'after extra time' },
  'qf-1': { teams: ['ARG', 'SUI'], scores: [3, 1], winner: 'ARG', note: 'after extra time' },
  'qf-2': { teams: ['FRA', 'MAR'], scores: [2, 0], winner: 'FRA' },
  'qf-3': { teams: ['ESP', 'BEL'], scores: [2, 1], winner: 'ESP' },
  // ---- Semi-finals (complete; final is Spain v Argentina on 19 Jul) ----
  'sf-0': { teams: ['ENG', 'ARG'], scores: [1, 2], winner: 'ARG' },
  'sf-1': { teams: ['FRA', 'ESP'], scores: [0, 2], winner: 'ESP' },
};

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
  'r16-0': { kickoffUTC: '2026-07-05T20:00:00Z', venue: 'East Rutherford, NJ' },
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
  'qf-2': { kickoffUTC: '2026-07-09T20:00:00Z', venue: 'Foxborough, MA' },
  'qf-3': { kickoffUTC: '2026-07-10T19:00:00Z', venue: 'Inglewood, CA' },
  // ---- Semi-finals (sf-1 = France/Spain → 14 Jul Arlington; sf-0 = England/Argentina → 15 Jul Atlanta) ----
  'sf-0': { kickoffUTC: '2026-07-15T19:00:00Z', venue: 'Atlanta' },
  'sf-1': { kickoffUTC: '2026-07-14T19:00:00Z', venue: 'Arlington, TX' },
  // ---- Final ----
  final: { kickoffUTC: '2026-07-19T19:00:00Z', venue: 'East Rutherford, NJ' },
};

export const TOURNAMENT_TITLE = 'FIFA World Cup 2026';
export const TOURNAMENT_SUBTITLE = 'Round of 32 → Final';
