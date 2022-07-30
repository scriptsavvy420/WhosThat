import { useEffect, useState } from "react";

export default function Timer({
  isAllOptionLocked,
  questionChanged,
  setGameOver,
}) {
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    if (isAllOptionLocked) return setTimer((prev) => prev);
    if (timer === 0) return setGameOver(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isAllOptionLocked, setGameOver]);

  useEffect(() => {
    setTimer(10);
  }, [questionChanged]);

  return timer;
}
