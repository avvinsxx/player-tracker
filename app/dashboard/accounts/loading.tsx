import Spinner from "@/modules/core/presentation/components/server/spinner";

export default async function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner size="medium" />
    </div>
  );
}
