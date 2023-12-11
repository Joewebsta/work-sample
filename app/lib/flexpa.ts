import { Dispatch, SetStateAction } from "react";
import { initiateTokenExchange, initiateEOBDataFetch } from "./fetchers";
import { Bundle } from "fhir/r4";

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

export function initializeFlexpaLink(
  setEOBData: Dispatch<SetStateAction<Bundle | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  if (process.env.NEXT_PUBLIC_PUBLISHABLE_KEY) {
    FlexpaLink.create({
      publishableKey: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
      onSuccess: (publicToken) =>
        handleOnSuccess(publicToken, setEOBData, setIsLoading),
    });
  } else {
    console.log("Please provide a PUBLISHABLE KEY environment variable.");
  }
}

async function handleOnSuccess(
  publicToken: string,
  setEOBData: Dispatch<SetStateAction<Bundle | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsLoading(true);

  const accessTokenResponse = await initiateTokenExchange(publicToken);
  const { accessToken }: { accessToken: string } =
    await accessTokenResponse.json();

  const EOBDataResponse = await initiateEOBDataFetch(accessToken);
  const { EOBData }: { EOBData: Bundle } = await EOBDataResponse.json();

  setIsLoading(false);
  setEOBData(EOBData);
}
