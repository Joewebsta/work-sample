import { NextRequest, NextResponse } from "next/server";
import { retrieveAccessToken } from "@/app/lib/fetchers";

export async function POST(request: NextRequest) {
  const { publicToken }: { publicToken: string } = await request.json();

  const res = await retrieveAccessToken(publicToken);
  const { access_token }: { access_token: string } = await res.json();

  return NextResponse.json({ accessToken: access_token });
}
