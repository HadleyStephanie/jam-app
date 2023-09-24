import Image from "next/image";
import React from "react";

export default function LandingPageHeader() {
  return (
    <div className=" flex h-[90px] w-screen items-center bg-slate-50 p-4 px-12 drop-shadow-lg">
      <Image
        src={"/../public/images/logo.jpg"}
        alt="Just a moment logo"
        width={80}
        height={80}
      />
      {/* <main className="min-h-[calc(100vh-90px)]"></main> */}
    </div>
  );
}
