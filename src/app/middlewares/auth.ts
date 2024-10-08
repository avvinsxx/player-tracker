import { NextRequest, NextResponse } from "next/server";

import { getUserForGuard } from "@/src/shared/api";

interface SavePlayerInput {
  request: NextRequest;
}

const dependencies = {
  getUserForGuard: getUserForGuard,
};

export async function auth(
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
