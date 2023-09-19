import React, { useState } from "react";
import CardsContainer from "./CardsContainer";
import Navbar from "./Navbar";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("connections");

  return (
    <div className=" flex h-screen flex-col justify-between">
      <h2 className="text-2xl capitalize">{activeTab}</h2>
      <div className="jusitfy-between flex h-screen">
        <CardsContainer activeTab={activeTab} setActiveTab={setActiveTab} />
        <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
    </div>
  );
}
