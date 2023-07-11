import { useState } from "react";
import ModalAddContact from "~/components/ModalAddContact";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Contacts() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <h1>Contacts</h1>
      <button
        className=" ml-5 mr-5 flex items-center gap-2 rounded-lg bg-[#abc0b6] px-3 py-2.5 text-center text-white hover:bg-stone-400 focus:outline-none"
        onClick={() => setShowModal(true)}
      >
        Add Contact
        <IoMdAddCircleOutline size={34} />
      </button>
      <ModalAddContact
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      ></ModalAddContact>
    </div>
  );
}
