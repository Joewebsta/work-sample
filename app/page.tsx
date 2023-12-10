"use client";
import Script from "next/script";
import FlexpaLinkButton from "./ui/FlexpaLinkButton";
import { initializeFlexpaLink } from "./lib/flexpa";

export default function Home() {
  return (
    <>
      <main className="px-4 pt-14 md:pt-32 min-h-screen justify-between">
        <h1 className="mb-9 text-4xl font-semibold text-center">
          Flexpa Work Sample
        </h1>
        <FlexpaLinkButton />
      </main>
      <Script src="https://js.flexpa.com/v1/" onLoad={initializeFlexpaLink} />
    </>
  );
}
