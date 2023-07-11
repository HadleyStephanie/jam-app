import React from "react";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function ModalAddContact({ isVisible, onClose }: Props) {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
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
            <h3 className="mb-6 pb-2 text-center text-2xl">New Contact Info</h3>
            <form>
              <div className="grid grid-cols-2">
                <label className="">First Name:</label>
                <input
                  className="mb-4 rounded border-4 border-solid border-stone-300"
                  type="text"
                ></input>
                <label className="">Last Name:</label>
                <input
                  className=" mb-4 rounded border-4 border-solid border-stone-300"
                  type="text"
                ></input>
                <label className="">Email:</label>
                <input
                  className="mb-4 rounded border-4 border-solid border-stone-300"
                  type="text"
                ></input>
                <label className="">Phone:</label>
                <input
                  className="mb-4 rounded border-4 border-solid border-stone-300"
                  type="number"
                ></input>
                <label className="">Work Phone:</label>
                <input
                  className="mb-4 rounded border-4 border-solid border-stone-300"
                  type="number"
                ></input>
                <label className="">Birthday:</label>
                <input
                  className="mb-4 rounded border-4 border-solid border-stone-300"
                  type="date"
                ></input>
                <label className="">Notes</label>
                <textarea className="mb-4 rounded border-4 border-solid border-stone-300"></textarea>
                <label className="mb-5">
                  How often would you like to connect?
                </label>
                <select className="mb-6 rounded border-4 border-solid border-stone-300">
                  <option value="weekly">Weekly</option>
                  <option value="bi-eekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </form>
            <div className="flex justify-center">
              <button className="mr-5 mt-4 rounded-lg bg-[#abc0b6] px-5 py-2.5 text-center text-white hover:bg-stone-400 focus:outline-none">
                Save Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
