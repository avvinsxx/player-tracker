import { Spinner } from "./spinner";

export function CardFallback() {
  return (
    <div
      className={`relative flex h-[300px] items-center justify-center overflow-hidden rounded-md bg-neutral-700 p-4`}
    >
      <Spinner size="medium" />
    </div>
  );
}
