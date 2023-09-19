import React, { useState } from "react";

import { type Contact } from "@prisma/client";
import ConnectionCard from "./ConnectionCard";
import BirthdayCard from "./BirthdayCard";

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

  return (
    <>
      <div className="flex max-w-7xl flex-1 flex-wrap justify-start gap-6 border border-black bg-red-500 px-4 py-4">
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
        {activeTab === "events" ? "events go here" : ""}
        {activeTab === "notes" ? "notes go here" : ""}
        {activeTab === "birthdays" ? <BirthdayCard /> : ""}
      </div>
    </>
  );
}
