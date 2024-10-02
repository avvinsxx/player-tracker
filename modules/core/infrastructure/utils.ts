export function arrayRange(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step,
  );
}

export function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there.",
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
