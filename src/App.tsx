import { useBracket } from './hooks/useBracket';
import { Bracket } from './components/Bracket';
import { Controls } from './components/Controls';

function App() {
  const b = useBracket();

  return (
    <div className="app">
      <Controls
        whatIf={b.whatIf}
        setWhatIf={b.setWhatIf}
        resetToActual={b.resetToActual}
        clearAll={b.clearAll}
        champion={b.champion}
      />

      <main className="stage">
        <Bracket
          winners={b.winners}
          highlightTeam={b.highlightTeam}
          setHighlightTeam={b.setHighlightTeam}
          pick={b.pick}
          isLocked={b.isLocked}
          champion={b.champion}
        />
      </main>

      <footer className="footer">
        <span>Round of 32 finalised · results through 30 Jun 2026.</span>
        <span>Flags by flag-icons. Unofficial fan project — not affiliated with FIFA.</span>
      </footer>
    </div>
  );
}

export default App;
