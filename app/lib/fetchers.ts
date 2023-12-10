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
      "content-type": "application/json",
    },
    body: JSON.stringify({
      public_token: publicToken,
      secret_key: process.env.FLEXPA_API_SECRET_KEY,
    }),
  });
}
