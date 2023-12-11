import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  const res = await fetchWithRetry(authorization);
  const EOBData = await res.json();
  console.log("EOBDATA: ", EOBData);

  return NextResponse.json({ EOBData });
}

// async function fetchWithRetry(url, maxRetries = 10) {
async function fetchWithRetry(authorization: string, maxRetries = 10) {
  let retries = 0;
  let delay = 1000;

  while (retries < maxRetries) {
    try {
      let response = await fetch(
        "https://api.flexpa.com/fhir/ExplanationOfBenefit",
        {
          method: "GET",
          headers: {
            authorization: authorization ?? "",
            "x-flexpa-raw": "0",
          },
        }
      );

      if (response.status === 429) {
        retries++;
        console.log(
          `Retry ${retries}/${maxRetries} after status 429. Waiting for ${delay} ms`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));

        delay *= 2;
      } else {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  throw new Error("Exceeded maximum retries");
}
