"use client";
import FlexpaLink from "./ui/FlexpaLink";

export default function Home() {
  return (
    <main className="px-4 pt-14 md:pt-32 min-h-screen justify-between">
      <h1 className="mb-9 text-4xl font-semibold text-center">
        Flexpa Work Sample
      </h1>
      <FlexpaLink />
    </main>
  );
}
