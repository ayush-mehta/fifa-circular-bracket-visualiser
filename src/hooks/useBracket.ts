import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  champion as championOf,
  seedWinners,
  setWinner as applySetWinner,
} from '../lib/bracketState';
import type { Winners } from '../lib/bracketState';
import { RESULTS } from '../data/bracket';
import type { MatchResult } from '../data/bracket';

const STORAGE_KEY = 'wc2026-bracket-v1';

export function getResult(matchId: string): MatchResult | undefined {
  return RESULTS[matchId];
}

function load(): { winners: Winners; whatIf: boolean } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.winners) return parsed;
  } catch {
    /* corrupt storage — fall back to seed */
  }
  return null;
}

export function useBracket() {
  const persisted = useMemo(load, []);
  const [winners, setWinners] = useState<Winners>(() => persisted?.winners ?? seedWinners());
  const [whatIf, setWhatIf] = useState<boolean>(() => persisted?.whatIf ?? false);
  const [highlightTeam, setHighlightTeam] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ winners, whatIf }));
    } catch {
      /* storage unavailable — predictions just won't persist */
    }
  }, [winners, whatIf]);

  /** A completed match is locked (not editable) unless what-if mode is on and it
   *  is currently showing its real result. */
  const isLocked = useCallback(
    (matchId: string) => {
      const r = RESULTS[matchId];
      return !!r && !whatIf && winners[matchId] === r.winner;
    },
    [winners, whatIf],
  );

  /** True when the match currently displays its real, played result. */
  const showsRealResult = useCallback(
    (matchId: string) => {
      const r = RESULTS[matchId];
      return !!r && winners[matchId] === r.winner;
    },
    [winners],
  );

  const pick = useCallback(
    (matchId: string, teamId: string) => {
      setWinners((prev) => {
        const r = RESULTS[matchId];
        if (r && !whatIf && prev[matchId] === r.winner) return prev; // locked
        return applySetWinner(prev, matchId, teamId);
      });
    },
    [whatIf],
  );

  const resetToActual = useCallback(() => setWinners(seedWinners()), []);
  // Clear every pick back to the Round of 32 starting line-up (predict from scratch).
  const resetToR32 = useCallback(() => setWinners({}), []);

  const champion = championOf(winners);

  return {
    winners,
    whatIf,
    setWhatIf,
    highlightTeam,
    setHighlightTeam,
    pick,
    resetToActual,
    resetToR32,
    isLocked,
    showsRealResult,
    champion,
  };
}
