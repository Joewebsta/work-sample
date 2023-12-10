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

function handleOnSuccess() {
  console.log("Success!");
}

export function initializeFlexpaLink() {
  FlexpaLink.create({
    publishableKey: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY ?? "",
    onSuccess: handleOnSuccess,
  });
}
