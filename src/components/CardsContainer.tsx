import React, { useState } from "react";

import { type Contact } from "@prisma/client";
import ConnectionCard from "./ConnectionCard";
import BirthdayCard from "./BirthdayCard";
import EventCard from "./EventCard";

import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function CardsContainer({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (a: string) => void;
}) {
  const [checkedCards, setCheckedCards] = useState<string[]>([]);
  const { data: sessionData } = useSession();

  const { data: contacts, refetch: refetchContacts } =
    api.contacts.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  const { data: notes, refetch: refetchNotes } = api.notes.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  return (
    <>
      <div className="flex w-full flex-1 flex-wrap justify-start gap-6 rounded-l-lg bg-stone-50 px-3 py-6">
        {activeTab === "connections"
          ? contacts?.map((contact) => (
              <ConnectionCard
                contact={contact}
                checked={checkedCards}
                setChecked={setCheckedCards}
                key={contact.id}
              />
            ))
          : ""}
        {activeTab === "groups" ? "Groups go here" : ""}
        {activeTab === "events" ? <EventCard /> : ""}
        {activeTab === "notes"
          ? notes?.map((note) => (
              <div
                key={note.id}
                className="h-52 w-64 border border-deep-cerulean-300 bg-deep-cerulean-700"
              >
                <p className="text-lg text-deep-cerulean-50">{note.title}</p>
                <p className="text-md text-deep-cerulean-100">{note.content}</p>
              </div>
            ))
          : ""}
        {activeTab === "birthdays" ? <BirthdayCard /> : ""}
      </div>
    </>
  );
}
