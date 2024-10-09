import { Spinner } from "@/src/shared/ui";

export default async function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner size="medium" />
    </div>
  );
}
