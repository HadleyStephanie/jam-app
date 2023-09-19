import React, { useRef } from "react";

interface TooltipProps {
  children: React.ReactNode;
  tooltip?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  tooltip,
}): JSX.Element => {
  return (
    <div className="group relative inline-block">
      {children}
      <span className="invisible absolute mt-2 rounded bg-red-500 p-1 text-white opacity-0 transition  group-hover:visible group-hover:opacity-100">
        {tooltip}
      </span>
    </div>
  );
};

export default Tooltip;
