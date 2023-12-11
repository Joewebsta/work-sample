"use client";
import EOBCards from "./EOBCards";
import { Bundle } from "fhir/r4";
export default function EOB({ EOBData }: { EOBData: Bundle }) {
  return (
    <>
      <div className="max-w-lg m-auto">
        <div className="px-4 sm:px-0">
          <h2 className="text-2xl text-center font-semibold leading-7 text-gray-900 mb-4">
            Explanation of Benefits
          </h2>
          <EOBCards EOBData={EOBData} />
        </div>
      </div>
    </>
  );
}
