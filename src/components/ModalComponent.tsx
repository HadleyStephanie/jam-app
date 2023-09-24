import { useSession } from "next-auth/react";
import React, {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function ModalComponent({
  isVisible,
  onClose,
  title,
  children,
  footer,
}: Props) {
  if (!isVisible) return null;

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id !== "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
      onClick={handleClose}
      id="wrapper"
    >
      <div className="flex w-[600px] flex-col">
        <button
          className=" place-self-end text-xl text-white"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="rounded bg-white p-2">
          <div className="p-6">
            <h3 className="mb-6 pb-2 text-center text-2xl">
              {!!title && title}
            </h3>
            <>{children}</>
            <>{!!footer && footer}</>
          </div>
        </div>
      </div>
    </div>
  );
}
