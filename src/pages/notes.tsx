import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import ModalComponent from "~/components/ModalComponent";
import { api } from "~/utils/api";

interface NoteToCreate {
  title: string | null;
  content: string | null;
}

//WHY DO I NEED TO DO THE DEFAULT ONE??
const defaultNote: NoteToCreate = {
  title: null,
  content: null,
};

export default function Notes() {
  const [showModal, setShowModal] = useState(false);
  const [noteToCreate, setNoteToCreate] = useState<NoteToCreate>(defaultNote);

  const { data: sessionData } = useSession();

  const { data: notes, refetch: refetchNotes } = api.notes.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const createNote = api.notes.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  // const handleSave = () => {
  //   if (!noteToCreate?.title) {
  //     return;
  //   }
  //   createNote.mutate({
  //     ...noteToCreate,
  //     title: noteToCreate.title,
  //   });
  //   setNoteToCreate(defaultNote);
  //   setShowModal(false);
  // };

  return (
    <div>
      <div className="flex items-end justify-between px-3 py-6">
        <h1 className="text-4xl">Notes</h1>
        <div className="flex items-center">
          <input
            className="rounded-full border-4 border-solid border-stone-300 p-1 px-2"
            type="text"
            placeholder="Search notes..."
          ></input>
          <button
            className="ml-5 mr-5 flex items-center gap-2 rounded-full bg-deep-cerulean-500 p-1 px-3 text-center text-white hover:bg-deep-cerulean-400 focus:outline-none"
            onClick={() => setShowModal(true)}
          >
            Add
            <IoMdAddCircleOutline size={30} />
          </button>
        </div>
      </div>
      <div>
        {notes?.map((note) => {
          return (
            <div
              key={note.id}
              className="ml-8 h-48 w-64 rounded-lg border-2 border-solid border-black p-4"
            >
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
          );
        })}
      </div>

      <ModalComponent
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={"New Note"}
        footer={
          <div className="flex justify-center">
            <button className="mr-5 mt-4 rounded-lg bg-deep-cerulean-500 px-5 py-2.5 text-center text-white hover:bg-deep-cerulean-400 focus:outline-none">
              Save Note
            </button>
          </div>
        }
      >
        <form>
          <div className="grid grid-cols-2">
            <label>Title</label>
            <input
              className="mb-4 rounded border-4 border-solid border-stone-300"
              type="text"
            ></input>
            <label>Note Content</label>
            <input
              className="mb-4 rounded border-4 border-solid border-stone-300"
              type="text"
            ></input>
          </div>
        </form>
      </ModalComponent>
    </div>
  );
}
