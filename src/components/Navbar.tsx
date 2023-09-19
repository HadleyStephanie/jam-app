import React, { useState } from "react";

import { BsCalendar3 } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { PiConfettiBold } from "react-icons/pi";

export default function Navbar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (a: string) => void;
}) {
  return (
    <div className=" flex flex-col items-center gap-4 rounded-lg bg-slate-300 px-2 py-2">
      <button
        className={` drop-shadow-sm ${
          activeTab === "connections" ? "border border-b-black" : ""
        }`}
        onClick={() => setActiveTab("connections")}
      >
        <BsPeopleFill size={36} className="p-1" />
      </button>
      <button
        className={`drop-shaow-sm ${
          activeTab === "events" ? "border border-b-black" : ""
        }`}
        onClick={() => setActiveTab("events")}
      >
        <BsCalendar3 size={36} className="p-1" />
      </button>
      <button
        className={`drop-shadow-sm ${
          activeTab === "notes" ? "border border-b-black" : ""
        }`}
        onClick={() => setActiveTab("notes")}
      >
        <BsPencilSquare size={36} className="p-1" />
      </button>
      <button
        className={`drop-shadow-sm ${
          activeTab === "birthdays" ? "border border-b-black" : ""
        }`}
        onClick={() => setActiveTab("birthdays")}
      >
        <PiConfettiBold size={36} className="p-1" />
      </button>
    </div>
  );
}
