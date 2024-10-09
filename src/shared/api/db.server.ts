import { createServerClient, SetAllCookies } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "./db.types";

export function createClient(setAllCookiesCallback?: SetAllCookies) {
  const cookieStore = cookies();
  const defaultCookieCallback: SetAllCookies = function (cookiesToSet) {
    try {
      cookiesToSet.forEach(({ name, value, options }) =>
        cookieStore.set(name, value, options),
      );
    } catch {
      // The `setAll` method was called from a Server Component.
      // This can be ignored if you have middleware refreshing
      // user sessions.
    }
  };

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll: setAllCookiesCallback ?? defaultCookieCallback,
      },
    },
  );
}
