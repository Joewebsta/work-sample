import { NextRequest, NextResponse } from "next/server";
import { Bundle } from "fhir/r4";
import { fetchAndRetry } from "@/app/lib/fetchers";
export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Request authentication required." },
      { status: 401 }
    );
  }

  const res = await fetchAndRetry(authorization);
  const EOBData: Bundle = await res.json();

  return NextResponse.json({ EOBData });
}
