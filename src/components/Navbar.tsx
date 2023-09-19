import { BsCalendar3 } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { PiConfettiBold } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import Tooltip from "./ToolTip";

export default function Navbar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (a: string) => void;
}) {
  return (
    <div className=" flex flex-col items-center gap-4 rounded-r-lg bg-slate-50 px-2 py-2 text-deep-cerulean-700">
      <Tooltip tooltip="Connections">
        <button
          className={`drop-shadow-sm hover:text-deep-cerulean-950 ${
            activeTab === "connections"
              ? "border-b-2 border-deep-cerulean-950 text-deep-cerulean-950"
              : ""
          }`}
          onClick={() => setActiveTab("connections")}
          title="Connections"
        >
          <BsPeopleFill size={36} className="p-1" />
        </button>
      </Tooltip>

      <button
        className={`  drop-shadow-sm hover:text-deep-cerulean-950 ${
          activeTab === "groups"
            ? "border-b-2 border-deep-cerulean-950 text-deep-cerulean-950"
            : ""
        }`}
        onClick={() => setActiveTab("groups")}
      >
        <FaPeopleGroup size={36} className="p-1" />
      </button>
      <button
        className={`  drop-shadow-sm hover:text-deep-cerulean-950 ${
          activeTab === "events"
            ? "border-b-2 border-deep-cerulean-950 text-deep-cerulean-950"
            : ""
        }`}
        onClick={() => setActiveTab("events")}
      >
        <BsCalendar3 size={36} className="p-1" />
      </button>
      <button
        className={`  drop-shadow-sm hover:text-deep-cerulean-950 ${
          activeTab === "notes"
            ? "border-b-2 border-deep-cerulean-950 text-deep-cerulean-950"
            : ""
        }`}
        onClick={() => setActiveTab("notes")}
      >
        <BsPencilSquare size={36} className="p-1" />
      </button>
      <button
        className={`  drop-shadow-sm hover:text-deep-cerulean-950 ${
          activeTab === "birthdays"
            ? "border-b-2 border-deep-cerulean-950 text-deep-cerulean-950"
            : ""
        }`}
        onClick={() => setActiveTab("birthdays")}
      >
        <PiConfettiBold size={36} className="p-1" />
      </button>
    </div>
  );
}
