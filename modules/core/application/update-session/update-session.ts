import { NextRequest, NextResponse } from "next/server";

import AuthService from "../../infrastructure/auth";

interface SavePlayerInput {
  request: NextRequest;
}

const dependencies = {
  getUserForGuard: AuthService.getUserForGuard,
};

export async function updateSession(
  { request }: SavePlayerInput,
  { getUserForGuard }: typeof dependencies = dependencies,
) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const {
    user,
    request: changedRequest,
    response,
  } = await getUserForGuard(request, supabaseResponse);

  if (!user && !changedRequest.nextUrl.pathname.startsWith("/login")) {
    const url = changedRequest.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return response;
}
