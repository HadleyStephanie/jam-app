import React from "react";

import { BsCalendar3 } from "react-icons/bs";

export default function Card() {
  return (
    <div className="event-card relative h-52 w-64 bg-gradient-to-r from-cyan-400 from-10% via-cyan-300 via-30% to-cyan-200 pt-8 drop-shadow-lg">
      <div className="h-full w-full rounded-b-lg bg-white p-4">
        <h3 className="pb-2 text-2xl">{`JoAnn's Retirement`}</h3>
        <p>Details</p>
        <p className="font-thin">in 2 days</p>
        <div className="absolute bottom-6 right-6">
          <BsCalendar3 size={40} />
        </div>
      </div>
    </div>
  );
}
