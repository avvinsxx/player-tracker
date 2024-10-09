import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "./db.server";

export async function getUserForGuard(
  request: NextRequest,
  response: NextResponse,
) {
  const supabase = createClient(function (cookiesToSet) {
    cookiesToSet.forEach(({ name, value, options }) =>
      request.cookies.set(name, value),
    );
    response = NextResponse.next({
      request,
    });
    cookiesToSet.forEach(({ name, value, options }) =>
      response.cookies.set(name, value, options),
    );
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user, request, response };
}

export async function getSession() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function login(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return error?.message;
}
