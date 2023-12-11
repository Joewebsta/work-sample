import { NextRequest, NextResponse } from "next/server";
import { retrieveAccessToken } from "@/app/lib/fetchers";

export async function POST(request: NextRequest) {
  const { publicToken }: { publicToken: string } = await request.json();

  try {
    const res = await retrieveAccessToken(publicToken);

    if (!res) {
      throw new Error("Error retrieving access token.");
    }

    const { access_token }: { access_token: string } = await res.json();
    return NextResponse.json({ accessToken: access_token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
