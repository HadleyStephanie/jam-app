import React from "react";

import { useState } from "react";
import { type Contact } from "@prisma/client";
import { api } from "../utils/api";
import { BsPersonCheck } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";
import { useSession } from "next-auth/react";

export default function ConnectionCard({
  contact,
  checked,
  setChecked,
}: {
  contact: Contact;
  checked: string[];
  setChecked: (ids: string[]) => void;
}) {
  const [connected, setConnected] = useState(false);

  const { data: sessionData } = useSession();

  const { data: contacts, refetch: refetchContacts } =
    api.contacts.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  const updateContact = api.contacts.update.useMutation({
    onSuccess: () => {
      void refetchContacts();
    },
  });

  const createConnection = api.connections.create.useMutation({
    onSuccess: () => {
      void setConnected(true);
    },
  });

  const handleConnected = async () => {
    // setChecked(true);
    setChecked([...checked, contact.id]);
    await createConnection
      .mutateAsync({
        contactId: contact.id,
      })
      .then((result) => {
        updateContact.mutate({
          ...contact,
          lastConnectionDate: result.createdAt,
        });
      })
      .catch((e) => console.error(e));
  };

  const handleClick = () => {
    handleConnected().catch((e) => console.error(e));
  };

  // if checked, wait 3 seconds and then turn back
  // useEffect(() => {
  //   if (checked) {
  //     setTimeout(() => {
  //       setChecked(false);
  //     }, 500);
  //   }
  // }, [checked, contact.id, createConnection]);

  return (
    <div
      className={`daily-connection-card relative h-52 w-64 bg-gradient-to-r from-emerald-400 from-10% via-emerald-300 via-30% to-emerald-200 pt-8 drop-shadow-lg `}
    >
      <div className="h-full w-full rounded-b-lg bg-slate-50 p-4">
        <h3 className="pb-2 text-2xl">
          {contact.firstName} {contact.lastName}
        </h3>
        <p className="font-thin">{`Last check-in: 
          ${contact.lastConnectionDate?.toDateString() ?? ""}
        `}</p>
        <button className="absolute bottom-6 right-6" onClick={handleClick}>
          {checked.includes(contact.id) ? (
            <BsPersonFillCheck size={40} className="text-emerald-300" />
          ) : (
            <BsPersonCheck size={40} className="text-deep-cerulean-700" />
          )}
        </button>
      </div>
    </div>
  );
}
