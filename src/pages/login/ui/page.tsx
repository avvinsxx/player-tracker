import { Logo } from "@/src/shared/ui";
import Login from "./login";

export function Page() {
  return (
    <div className="flex h-svh items-center justify-center bg-neutral-900">
      <div className="w-96 rounded-md border-2 border-neutral-700 bg-neutral-800 p-4 text-neutral-200">
        <Logo />
        <div className="mt-4">
          <Login />
        </div>
      </div>
    </div>
  );
}
