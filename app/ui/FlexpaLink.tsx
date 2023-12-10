"use client";
import Image from "next/image";

export default function FlexpaLink() {
  return (
    <button
      className="flex items-center justify-center bg-[#0d201a] gap-4 m-auto text-white rounded-md font-medium h-20 w-full max-w-lg py-2  hover:bg-[#0d201a]/90"
      // onClick={() => FlexpaLink.open()}
    >
      <Image src="/squircle.svg" alt="Flexpa Squircle" width={30} height={30} />
      Securely connect your health data
    </button>
  );
}
