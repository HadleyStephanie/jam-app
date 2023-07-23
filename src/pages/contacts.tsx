import { ChangeEvent, useMemo, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import ModalComponent from "~/components/ModalComponent";
import { Contact } from "@prisma/client";

interface ContactToCreate {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  jobTitle: string | null;
  phone: number | null;
  workPhone: number | null;
  birthday: Date | null;
  lastConnectionDate: Date | null;
  connectionThreshold: number | null;
}

const defaultContact: ContactToCreate = {
  firstName: null,
  lastName: null,
  email: null,
  jobTitle: null,
  phone: null,
  workPhone: null,
  birthday: null,
  lastConnectionDate: null,
  connectionThreshold: null,
};

export default function Contacts() {
  const [showModal, setShowModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [contactToCreate, setContactToCreate] =
    useState<ContactToCreate>(defaultContact);

  const { data: sessionData } = useSession();

  const { data: contacts, refetch: refetchContacts } =
    api.contacts.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  const createContact = api.contacts.create.useMutation({
    onSuccess: () => {
      void refetchContacts();
    },
  });

  const handleSave = () => {
    if (!contactToCreate?.firstName) {
      return;
    }
    createContact.mutate({
      ...contactToCreate,
      firstName: contactToCreate.firstName,
    });
    setContactToCreate(defaultContact);
    setShowModal(false);
  };

  const handleSearchContacts = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  const filteredContacts = useMemo(() => {
    if (!searchString) return contacts;
    return (
      contacts?.filter((contact) =>
        (contact.firstName + (contact?.lastName ?? ""))
          .toLowerCase()
          .includes(searchString.toLowerCase())
      ) ?? []
    );
  }, [contacts, searchString]);

  return (
    <div>
      <div className="flex items-end justify-between px-3 py-6">
        <h1 className="text-4xl">Contacts</h1>
        <div className="flex items-center">
          <input
            className="rounded rounded-lg border-4 border-solid border-stone-300 p-1 px-2"
            type="text"
            placeholder="Search contacts..."
            value={searchString}
            onChange={handleSearchContacts}
          ></input>
          <button
            className="ml-5 mr-5 flex items-center gap-2 rounded-2xl bg-[#abc0b6] p-1 px-3 text-center text-white hover:bg-stone-400 focus:outline-none"
            onClick={() => setShowModal(true)}
          >
            Add
            <IoMdAddCircleOutline size={30} />
          </button>
        </div>
      </div>
      <div className="flex gap-6 pl-6 pt-10">
        {filteredContacts?.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      <ModalComponent
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={"Create New Contact"}
        footer={
          <div className="flex justify-center">
            <button
              className="mr-5 mt-4 rounded-lg bg-[#abc0b6] px-5 py-2.5 text-center text-white hover:bg-stone-400 focus:outline-none"
              onClick={handleSave}
            >
              Save Contact
            </button>
          </div>
        }
      >
        <form>
          <div className="grid grid-cols-2">
            <label className="">First Name:</label>
            <input
              className="mb-4 rounded border-4 border-solid border-stone-300"
              type="text"
              value={contactToCreate.firstName ?? ""}
              onChange={(e) =>
                setContactToCreate({
                  ...contactToCreate,
                  firstName: e.target.value,
                })
              }
            ></input>
            <label className="">Last Name:</label>
            <input
              className=" mb-4 rounded border-4 border-solid border-stone-300"
              type="text"
              value={contactToCreate.lastName ?? ""}
              onChange={(e) =>
                setContactToCreate({
                  ...contactToCreate,
                  lastName: e.target.value,
                })
              }
            ></input>
            <label className="">Email:</label>
            <input
              className="mb-4 rounded border-4 border-solid border-stone-300"
              type="text"
              value={contactToCreate.email ?? ""}
              onChange={(e) =>
                setContactToCreate({
                  ...contactToCreate,
                  email: e.target.value,
                })
              }
            ></input>
            <label className="">Job Title:</label>
            <input
              className="mb-4 rounded border-4 border-solid border-stone-300"
              type="text"
              value={contactToCreate.jobTitle ?? ""}
              onChange={(e) =>
                setContactToCreate({
                  ...contactToCreate,
                  jobTitle: e.target.value,
                })
              }
            ></input>
            <label className="">Phone:</label>
            <input
              className="mb-4 rounded border-4 border-solid border-stone-300"
              type="number"
              value={contactToCreate.phone ?? ""}
              onChange={(e) =>
                setContactToCreate({
                  ...contactToCreate,
                  phone: Number(e.target.value),
                })
              }
            ></input>
            <label className="">Work Phone:</label>
            <input
              className="mb-4 rounded border-4 border-solid border-stone-300"
              type="number"
              value={contactToCreate.workPhone ?? ""}
              onChange={(e) =>
                setContactToCreate({
                  ...contactToCreate,
                  workPhone: Number(e.target.value),
                })
              }
            ></input>
            <label className="">Birthday:</label>
            <input
              className="mb-4 rounded border-4 border-solid border-stone-300"
              type="date"
              onChange={(e) =>
                setContactToCreate({
                  ...contactToCreate,
                  birthday: new Date(e.target.value),
                })
              }
            ></input>
            <label className="">Notes</label>
            <textarea className="mb-4 rounded border-4 border-solid border-stone-300"></textarea>
            <label className="mb-5">How often would you like to connect?</label>
            <select
              className="mb-6 rounded border-4 border-solid border-stone-300"
              value={contactToCreate.connectionThreshold ?? ""}
              onChange={(e) =>
                setContactToCreate({
                  ...contactToCreate,
                  connectionThreshold: Number(e.target.value),
                })
              }
            >
              <option value="7">Weekly</option>
              <option value="14">Bi-Weekly</option>
              <option value="30">Monthly</option>
              <option value="90">Quarterly</option>
            </select>
          </div>
        </form>
      </ModalComponent>
    </div>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  const [openNotes, setOpenNotes] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const createNote = api.notes.create.useMutation({});

  const saveDisabled = !noteContent.length;

  const handleOpenNotes = () => {
    setOpenNotes(true);
  };

  const handleCloseNotes = () => {
    setOpenNotes(false);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNoteTitle(e.target.value);
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setNoteContent(e.target.value);
  };

  const handleSave = () => {
    if (!noteContent.length) {
      return;
    }
    createNote.mutate({
      contactId: contact.id,
      title: noteTitle.length ? noteTitle : defaultTitle,
      content: noteContent,
    });
    setNoteTitle("");
    setNoteContent("");
    setOpenNotes(false);
  };

  const defaultTitle = useMemo(() => {
    return `${contact.firstName}: ${new Date().toDateString()}`;
  }, [contact.firstName]);

  return (
    <div className="h-28 w-48 rounded-lg border-2 border-solid border-black bg-[#abc0b6] p-2">
      <div className="">
        {contact.firstName} {contact.lastName}
      </div>
      <div>{contact.jobTitle}</div>
      <button onClick={handleOpenNotes}>
        <BsPencilSquare size={20} />
      </button>
      <ModalComponent
        isVisible={openNotes}
        onClose={handleCloseNotes}
        title={`New Note`}
        footer={
          <div className="flex justify-center">
            <button
              className="mr-5 mt-4 rounded-lg bg-[#abc0b6] px-5 py-2.5 text-center text-white focus:outline-none enabled:hover:bg-stone-400 disabled:opacity-50"
              onClick={handleSave}
              disabled={saveDisabled}
            >
              Save Notes
            </button>
          </div>
        }
      >
        <div className="flex flex-col justify-center">
          <label>Notes Title: </label>
          <input
            className="mb-8 rounded rounded-lg border-4 border-solid border-stone-300 p-1 px-2"
            placeholder={defaultTitle}
            value={noteTitle}
            onChange={handleTitle}
          ></input>

          <textarea
            className="mb-4 min-h-[200px] rounded border-4 border-solid border-stone-300 p-2"
            placeholder="Start typing..."
            onChange={handleContent}
            value={noteContent}
          ></textarea>
        </div>
      </ModalComponent>
    </div>
  );
}
