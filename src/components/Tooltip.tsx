interface TipState {
  name: string;
  detail: string | null;
  x: number;
  y: number;
}

export function Tooltip({ tip }: { tip: TipState | null }) {
  if (!tip) return null;
  return (
    <div className="tooltip" style={{ left: tip.x, top: tip.y }} role="status" aria-live="polite">
      <span className="tooltip-name">{tip.name}</span>
      {tip.detail && <span className="tooltip-detail">{tip.detail}</span>}
    </div>
  );
}
