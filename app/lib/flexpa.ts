import { initiateTokenExchange } from "./fetchers";

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
  const res = await initiateTokenExchange(publicToken);
  const accessToken = await res.json();
  console.log("ACCESS TOKEN: ", accessToken);
}
