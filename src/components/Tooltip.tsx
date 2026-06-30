interface TipState {
  name: string;
  fixture: string | null;
  result: string | null;
  x: number;
  y: number;
}

export function Tooltip({ tip }: { tip: TipState | null }) {
  if (!tip) return null;
  return (
    <div className="tooltip" style={{ left: tip.x, top: tip.y }} role="status" aria-live="polite">
      <span className="tooltip-name">{tip.name}</span>
      {tip.fixture && <span className="tooltip-fixture">{tip.fixture}</span>}
      {tip.result && <span className="tooltip-detail">{tip.result}</span>}
    </div>
  );
}
