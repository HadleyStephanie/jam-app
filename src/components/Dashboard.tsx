import React, { useState } from "react";
import CardsContainer from "./CardsContainer";
import Navbar from "./Navbar";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("connections");

  return (
    <div className=" flex h-screen w-full flex-col justify-between px-4">
      <h2 className="pt-6 text-4xl capitalize tracking-wide text-slate-900">
        {activeTab}
      </h2>
      <div className="jusitfy-between flex h-screen w-full">
        <CardsContainer activeTab={activeTab} setActiveTab={setActiveTab} />
        <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
    </div>
  );
}
