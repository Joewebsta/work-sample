import { initiateTokenExchange, initiateEOBDataFetch } from "./fetchers";

declare const FlexpaLink: {
  create: ({
    publishableKey,
    onSuccess,
  }: {
    publishableKey: string;
    onSuccess: (publicToken: string) => void;
  }) => unknown;
  open: () => unknown;
};

export function initializeFlexpaLink() {
  FlexpaLink.create({
    publishableKey: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY ?? "",
    onSuccess: handleOnSuccess,
  });
}

async function handleOnSuccess(publicToken: string) {
  const accessTokenResponse = await initiateTokenExchange(publicToken);
  const { accessToken }: { accessToken: string } =
    await accessTokenResponse.json();

  const EOBDataResponse = await initiateEOBDataFetch(accessToken);
  const { EOBData } = await EOBDataResponse.json();
  console.log("EOBDATA: ", EOBData);

  // setEOBData(EOBData);
}
