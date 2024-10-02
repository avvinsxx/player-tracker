import Spinner from "./spinner";

export default function TableLoader() {
  return (
    <div className="flex min-h-48 items-center justify-center">
      <Spinner size="medium" />
    </div>
  );
}
