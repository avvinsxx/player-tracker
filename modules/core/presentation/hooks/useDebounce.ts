import { useRef } from "react";

export function useDebounce(
  callback: (...args: any[]) => void,
  timeout: number,
) {
  const timer = useRef<NodeJS.Timeout>();
  const lastSearchChange = useRef<number>();

  function perform(...args: any[]) {
    if (
      lastSearchChange.current &&
      lastSearchChange.current + 300 > Date.now()
    ) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => callback(...args), timeout);
    lastSearchChange.current = Date.now();
  }

  return perform;
}
