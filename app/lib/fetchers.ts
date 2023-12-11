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
  return await fetch("https://api.flexpa.com/link/exchange", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      public_token: publicToken,
      secret_key: process.env.FLEXPA_API_SECRET_KEY,
    }),
  });
}

export async function initiateEOBDataFetch(accessToken: string) {
  return await fetch("/api/flexpa-fhir", {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
}
export async function fetchEOBData() {
  return await fetch(
    // "https://api.flexpa.com/fhir/ExplanationOfBenefit",
    "https://api.flexpa.com/fhir/ExplanationOfBenefit?patient=$PATIENT_ID",
    {
      method: "GET",
      headers: {
        authorization: authorization ?? "",
        "x-flexpa-raw": "0",
      },
    }
  );
}
