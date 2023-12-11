export async function initiateTokenExchange(publicToken: string) {
  try {
    const response = await fetch("/api/access-token-exchange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicToken }),
    });

    if (!response.ok) {
      throw new Error("Error retrieving access token.");
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export async function retrieveAccessToken(publicToken: string) {
  try {
    const response = await fetch(
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

    if (!response.ok) {
      throw new Error(
        `Error retrieving access token. Server responded with status code ${response.status}`
      );
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export async function initiateEOBDataFetch(accessToken: string) {
  try {
    const response = await fetch("/api/flexpa-fhir", {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching EOB data.");
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

async function fetchEOBData(authorization: string) {
  try {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export async function fetchAndRetry(authorization: string) {
  let retries = 0;
  let delay = 1000;
  let maxRetries = 10;

  while (retries < maxRetries) {
    try {
      const response = await fetchEOBData(authorization);

      if (response && response.status === 429) {
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
