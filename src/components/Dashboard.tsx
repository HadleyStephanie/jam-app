import React, { useState } from "react";
import CardsContainer from "./CardsContainer";
import Navbar from "./Navbar";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("connections");

  return (
    <div className=" flex h-full justify-between">
      <CardsContainer activeTab={activeTab} setActiveTab={setActiveTab} />
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />
    </div>
  );
}
