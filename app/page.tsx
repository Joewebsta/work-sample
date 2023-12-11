"use client";
import Script from "next/script";
import { Bundle } from "fhir/r4";
import { useState } from "react";
import { initializeFlexpaLink } from "./lib/flexpa";
import FlexpaLinkButton from "./ui/FlexpaLinkButton";
import EOB from "./ui/EOB";

export default function Home() {
  const [EOBData, setEOBData] = useState<Bundle | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <main className="px-4 pt-14 md:pt-32 min-h-screen justify-between">
        <h1 className="mb-9 text-4xl font-semibold text-center">
          Flexpa Work Sample
        </h1>
        {!isLoading && !EOBData && <FlexpaLinkButton />}
        {isLoading && <p className="text-center">Loading...</p>}
        {EOBData && <EOB EOBData={EOBData} />}
      </main>
      <Script
        src="https://js.flexpa.com/v1/"
        onLoad={() => initializeFlexpaLink(setEOBData, setIsLoading)}
      />
    </>
  );
}
