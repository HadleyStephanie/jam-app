import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import ModalComponent from "~/components/ModalComponent";
import { api } from "~/utils/api";
import Contacts from "./contacts";

interface GroupToCreate {
  groupTitle: string | null;
  lastConnectionDate: Date | null;
  connectionThreshold: number | null;
  contactId: string[] | null;
}

const defaultGroup: GroupToCreate = {
  groupTitle: null,
  lastConnectionDate: null,
  connectionThreshold: null,
  contactId: null,
};

export default function Groups() {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [searchGroupsString, setSearchGroupsString] = useState("");
  const [groupToCreate, setGroupToCreate] =
    useState<GroupToCreate>(defaultGroup);

  const { data: sessionData } = useSession();

  const { data: contacts } = api.contacts.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const { data: groups, refetch: refectchGroups } = api.groups.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const createGroup = api.groups.create.useMutation({
    onSuccess: () => {
      void refectchGroups();
    },
  });

  // const handleGetContactId = async () => {};

  const handleSaveGroup = () => {
    if (!groupToCreate?.groupTitle || !groupToCreate?.contactId) {
      return;
    }

    createGroup.mutate({
      ...groupToCreate,
      groupTitle: groupToCreate.groupTitle,
      contactId: groupToCreate.contactId,
    });
    setGroupToCreate(defaultGroup);
    setShowGroupModal(false);
  };

  return (
    <div>
      <div className="flex items-end justify-between px-3 py-6">
        <h1 className="text-4xl tracking-wide">Groups</h1>
        <div className="flex items-center">
          <input
            className="rounded-full border-4 border-solid border-slate-300 p-1 px-2"
            type="text"
            placeholder="Search groups..."
          ></input>
          <button
            onClick={() => setShowGroupModal(true)}
            className="ml-5 mr-5 flex items-center gap-2 rounded-full bg-gradient-to-r from-eucalyptus-50  to-eucalyptus-400 px-2 focus:outline-none"
          >
            <IoMdAddCircleOutline size={30} />
            Create a group
          </button>
        </div>
      </div>

      <ModalComponent
        isVisible={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        title={"Create New Group"}
        footer={
          <div className="flex justify-center">
            <button
              onClick={handleSaveGroup}
              className="mr-5 mt-4 rounded-full bg-gradient-to-l from-eucalyptus-50  to-eucalyptus-400 px-5 py-2.5 text-center font-semibold text-slate-900 focus:outline-none"
            >
              Save group
            </button>
          </div>
        }
      >
        <form>
          <div className="grid grid-cols-2">
            <label>Group Title</label>
            <input className="mb-4 rounded-lg border-4 border-solid border-slate-300 px-2"></input>

            <label>Contacts in Group</label>
            <select
              className="mb-4 rounded-lg border-4 border-solid border-slate-300 px-2"
              multiple
            >
              {contacts?.map((contact) => (
                <option key={contact.id}>{contact.firstName}</option>
              ))}
            </select>

            {/* <label>Notes</label>
            <textarea className="mb-4 rounded-lg border-4 border-solid border-slate-300 px-2"></textarea> */}

            <label className="pr-1 text-slate-900">
              How often would you like to connect?
            </label>
            <select className="mb-4 rounded-lg border-4 border-solid border-slate-300 px-2">
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
            </select>
          </div>
        </form>
      </ModalComponent>
    </div>
  );
}
