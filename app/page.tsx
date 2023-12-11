"use client";
import Script from "next/script";
import FlexpaLinkButton from "./ui/FlexpaLinkButton";
import { initializeFlexpaLink } from "./lib/flexpa";
import { Bundle } from "fhir/r4";
import { useState } from "react";

export default function Home() {
  const [EOBData, setEOBData] = useState<Bundle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("EOB DATA: ", EOBData);

  return (
    <>
      <main className="px-4 pt-14 md:pt-32 min-h-screen justify-between">
        <h1 className="mb-9 text-4xl font-semibold text-center">
          Flexpa Work Sample
        </h1>
        {!isLoading && !EOBData && <FlexpaLinkButton />}
        {isLoading && <p className="text-center">Loading...</p>}
      </main>
      <Script
        src="https://js.flexpa.com/v1/"
        onLoad={() => initializeFlexpaLink(setEOBData, setIsLoading)}
      />
    </>
  );
}
