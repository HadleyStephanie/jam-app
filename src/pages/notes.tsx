import { IoMdAddCircleOutline } from "react-icons/io";

export default function Notes() {
  return (
    <div className="flex items-end justify-between px-3 py-6">
      <h1 className="text-4xl">Notes</h1>
      <div className="flex items-center">
        <input
          className="rounded rounded-lg border-4 border-solid border-stone-300 p-1 px-2"
          type="text"
          placeholder="Search notes..."
        ></input>
        <button className="ml-5 mr-5 flex items-center gap-2 rounded-2xl bg-[#abc0b6] p-1 px-3 text-center text-white hover:bg-stone-400 focus:outline-none">
          Add
          <IoMdAddCircleOutline size={30} />
        </button>
      </div>
    </div>
  );
}
