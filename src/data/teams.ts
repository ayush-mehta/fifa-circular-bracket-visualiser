// The 32 nations of the 2026 FIFA World Cup Round of 32.
// `iso2` is the flag-icons code (mostly ISO 3166-1 alpha-2; `gb-eng` for England).

export interface Team {
  id: string; // short stable code, e.g. "BRA"
  name: string; // display name, shown in tooltips / aria-labels
  iso2: string; // flag-icons code used to resolve the bundled SVG flag
}

export const TEAMS: Record<string, Team> = {
  // Right half (top -> bottom)
  BRA: { id: 'BRA', name: 'Brazil', iso2: 'br' },
  JPN: { id: 'JPN', name: 'Japan', iso2: 'jp' },
  CIV: { id: 'CIV', name: "Côte d'Ivoire", iso2: 'ci' },
  NOR: { id: 'NOR', name: 'Norway', iso2: 'no' },
  MEX: { id: 'MEX', name: 'Mexico', iso2: 'mx' },
  ECU: { id: 'ECU', name: 'Ecuador', iso2: 'ec' },
  ENG: { id: 'ENG', name: 'England', iso2: 'gb-eng' },
  COD: { id: 'COD', name: 'DR Congo', iso2: 'cd' },
  ARG: { id: 'ARG', name: 'Argentina', iso2: 'ar' },
  CPV: { id: 'CPV', name: 'Cape Verde', iso2: 'cv' },
  AUS: { id: 'AUS', name: 'Australia', iso2: 'au' },
  EGY: { id: 'EGY', name: 'Egypt', iso2: 'eg' },
  SUI: { id: 'SUI', name: 'Switzerland', iso2: 'ch' },
  ALG: { id: 'ALG', name: 'Algeria', iso2: 'dz' },
  COL: { id: 'COL', name: 'Colombia', iso2: 'co' },
  GHA: { id: 'GHA', name: 'Ghana', iso2: 'gh' },
  // Left half (top -> bottom)
  GER: { id: 'GER', name: 'Germany', iso2: 'de' },
  PAR: { id: 'PAR', name: 'Paraguay', iso2: 'py' },
  FRA: { id: 'FRA', name: 'France', iso2: 'fr' },
  SWE: { id: 'SWE', name: 'Sweden', iso2: 'se' },
  RSA: { id: 'RSA', name: 'South Africa', iso2: 'za' },
  CAN: { id: 'CAN', name: 'Canada', iso2: 'ca' },
  NED: { id: 'NED', name: 'Netherlands', iso2: 'nl' },
  MAR: { id: 'MAR', name: 'Morocco', iso2: 'ma' },
  POR: { id: 'POR', name: 'Portugal', iso2: 'pt' },
  CRO: { id: 'CRO', name: 'Croatia', iso2: 'hr' },
  ESP: { id: 'ESP', name: 'Spain', iso2: 'es' },
  AUT: { id: 'AUT', name: 'Austria', iso2: 'at' },
  USA: { id: 'USA', name: 'United States', iso2: 'us' },
  BIH: { id: 'BIH', name: 'Bosnia and Herzegovina', iso2: 'ba' },
  BEL: { id: 'BEL', name: 'Belgium', iso2: 'be' },
  SEN: { id: 'SEN', name: 'Senegal', iso2: 'sn' },
};

export function getTeam(id: string | null | undefined): Team | undefined {
  return id ? TEAMS[id] : undefined;
}
