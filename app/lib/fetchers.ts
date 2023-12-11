import { Bundle } from "fhir/r4";
export async function initiateTokenExchange(publicToken: string) {
  return await fetch("/api/access-token-exchange", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ publicToken }),
  });
}

export async function retrieveAccessToken(publicToken: string) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_FLEXPA_API_BASEURL}/link/exchange`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_token: publicToken,
        secret_key: process.env.FLEXPA_API_SECRET_KEY,
      }),
    }
  );
}

export async function initiateEOBDataFetch(accessToken: string) {
  return await fetch("/api/flexpa-fhir", {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
}

async function fetchEOBData(authorization: string) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_FLEXPA_API_BASEURL}/fhir/ExplanationOfBenefit`,
    {
      method: "GET",
      headers: {
        authorization,
        "x-flexpa-raw": "0",
      },
    }
  );
}

export async function fetchAndRetry(authorization: string) {
  let retries = 0;
  let delay = 1000;
  let maxRetries = 10;

  while (retries < maxRetries) {
    try {
      let response = await fetchEOBData(authorization);

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
