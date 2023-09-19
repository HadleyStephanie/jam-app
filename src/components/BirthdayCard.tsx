import React from "react";

import { PiConfetti } from "react-icons/pi";

export default function Card() {
  return (
    <div className="birthday-card relative h-52 w-full bg-gradient-to-r from-fuchsia-400 from-10% via-fuchsia-300 via-30% to-fuchsia-200 pt-8 drop-shadow-lg">
      <div className="h-full w-full rounded-b-lg bg-white p-4">
        <h3 className="pb-2 text-2xl">{`Jim's Birthday!`}</h3>
        <p className="font-thin">email</p>
        <p className="font-thin">text</p>
        <p className="font-thin">in 5 days</p>
        <div className="absolute bottom-6 right-6">
          <PiConfetti size={40} />
        </div>
      </div>
    </div>
  );
}
