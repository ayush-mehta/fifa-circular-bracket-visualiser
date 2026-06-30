import { getTeam } from '../data/teams';
import { TOURNAMENT_SUBTITLE, TOURNAMENT_TITLE } from '../data/bracket';

interface ControlsProps {
  whatIf: boolean;
  setWhatIf: (v: boolean) => void;
  resetToActual: () => void;
  clearAll: () => void;
  champion: string | null;
}

export function Controls({ whatIf, setWhatIf, resetToActual, clearAll, champion }: ControlsProps) {
  const championTeam = getTeam(champion);

  return (
    <header className="controls">
      <div className="titles">
        <h1>{TOURNAMENT_TITLE}</h1>
        <p className="subtitle">{TOURNAMENT_SUBTITLE}</p>
      </div>

      <p className="hint">
        Click a team to advance it one round toward the trophy. Hover a flag for its country name,
        fixture date and venue — and to trace that team&rsquo;s path to the final.
      </p>

      <div className="buttons">
        <button type="button" className="btn" onClick={resetToActual}>
          Reset to actual
        </button>
        <button type="button" className="btn" onClick={clearAll}>
          Clear all
        </button>
        <label className="toggle">
          <input type="checkbox" checked={whatIf} onChange={(e) => setWhatIf(e.target.checked)} />
          <span>What-if mode (edit played results)</span>
        </label>
      </div>

      <p className="legend">
        Solid rings = already played (locked). Toggle <em>what-if</em> to override them.
      </p>

      {championTeam && (
        <p className="champion-banner" role="status">
          🏆 {championTeam.name} — your predicted champions
        </p>
      )}
    </header>
  );
}
