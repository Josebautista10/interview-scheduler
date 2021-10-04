import { useState } from "react";
// custom hook declaration to set mode and set user history
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory(() => [...history, newMode]);
    }
    setMode(() => newMode);
  };

  function back() {
    if (history.length > 1) {
      const updatedHistory = history.slice(0, history.length - 1)
      setMode(updatedHistory[updatedHistory.length - 1])
      setHistory(updatedHistory)
    }
  }
  return { mode, transition, back };
}