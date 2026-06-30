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
  result?: SeedResult; // present iff the match has been played
}

export const R32_SEED: R32Seed[] = [
  // ---- Right half (top -> bottom) ----
  { id: 'r32-0', top: 'BRA', bottom: 'JPN', result: { winner: 'BRA', scoreTop: 2, scoreBottom: 1 } },
  { id: 'r32-1', top: 'CIV', bottom: 'NOR' },
  { id: 'r32-2', top: 'MEX', bottom: 'ECU' },
  { id: 'r32-3', top: 'ENG', bottom: 'COD' },
  { id: 'r32-4', top: 'ARG', bottom: 'CPV' },
  { id: 'r32-5', top: 'AUS', bottom: 'EGY' },
  { id: 'r32-6', top: 'SUI', bottom: 'ALG' },
  { id: 'r32-7', top: 'COL', bottom: 'GHA' },
  // ---- Left half (top -> bottom) ----
  {
    id: 'r32-8',
    top: 'GER',
    bottom: 'PAR',
    result: { winner: 'PAR', scoreTop: 1, scoreBottom: 1, penalties: [3, 4], note: 'Paraguay won 4–3 on penalties' },
  },
  { id: 'r32-9', top: 'FRA', bottom: 'SWE' },
  { id: 'r32-10', top: 'RSA', bottom: 'CAN', result: { winner: 'CAN', scoreTop: 0, scoreBottom: 1 } },
  {
    id: 'r32-11',
    top: 'NED',
    bottom: 'MAR',
    result: { winner: 'MAR', scoreTop: 1, scoreBottom: 1, penalties: [2, 3], note: 'Morocco won 3–2 on penalties' },
  },
  { id: 'r32-12', top: 'POR', bottom: 'CRO' },
  { id: 'r32-13', top: 'ESP', bottom: 'AUT' },
  { id: 'r32-14', top: 'USA', bottom: 'BIH' },
  { id: 'r32-15', top: 'BEL', bottom: 'SEN' },
];

export const TOURNAMENT_TITLE = 'FIFA World Cup 2026';
export const TOURNAMENT_SUBTITLE = 'Round of 32 → Final';
