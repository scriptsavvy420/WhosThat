import { useEffect, useState } from "react";

export default function Timer({ setStop, questionChanged }) {
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    if (timer === 0) return setTimer(0);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setStop]);

  useEffect(() => {
    setTimer(10);
  }, [questionChanged]);

  return timer;
}
