import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";
import { Contact } from "@prisma/client";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { setTimeout } from "timers";

export interface Connection {
  contact: {
    contactId: number;
    name: string;
    lastName: string;
    lastConnectionDate: string;
  };
}

const dummyConnections: Connection[] = [
  {
    contact: {
      contactId: 1,
      name: "JoAnn",
      lastName: "Walters",
      lastConnectionDate: "6/3/23",
    },
  },
  {
    contact: {
      contactId: 2,
      name: "Bob",
      lastName: "Builder",
      lastConnectionDate: "6/8/23",
    },
  },
  {
    contact: {
      contactId: 3,
      name: "Kate",
      lastName: "Blanchett",
      lastConnectionDate: "5/31/23",
    },
  },
  {
    contact: {
      contactId: 4,
      name: "Jim",
      lastName: "Halpert",
      lastConnectionDate: "6/29/23",
    },
  },
  {
    contact: {
      contactId: 5,
      name: "Jam",
      lastName: "Balpert",
      lastConnectionDate: "6/29/23",
    },
  },
];

export default function DailyCarousel() {
  const sliderRef = useRef<Slider>(null);

  const { data: sessionData } = useSession();

  const { data: contacts, refetch: refetchContacts } =
    api.contacts.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  const contactList = useMemo(() => {
    return contacts?.filter((contact) => {
      if (!contact.lastConnectionDate) return true;
      const diff = Date.now() - contact.lastConnectionDate.getTime();
      return diff >= (contact.connectionThreshold ?? 7) * 24 * 60 * 60 * 1000;
    });
  }, [contacts]);

  const NextArrow = () => {
    return (
      <button
        className="h-8 w-8"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <FaChevronCircleRight />
      </button>
    );
  };

  const PrevArrow = () => {
    return (
      <button
        className="h-8 w-8"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <FaChevronCircleLeft />
      </button>
    );
  };

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    dots: false,
    arrows: false,
  };

  return (
    <div className="py-4">
      <h3 className="text-xl font-extralight">Daily Connections</h3>
      <div className="flex items-center">
        <PrevArrow />
        <Slider ref={sliderRef} {...sliderSettings}>
          {contacts?.map((contact) => (
            <Card key={contact.id} contact={contact} />
            // <div key={`connection-${connection.contact.contactId}`}>
            //   <h2>{connection.contact.name}</h2>
            //   <p>{connection.contact.lastConnectionDate}</p>
            // </div>
          ))}
        </Slider>
        <NextArrow />
      </div>
    </div>
  );
}

function Card({ contact }: { contact: Contact }) {
  const [checked, setChecked] = useState(false);
  const [connected, setConnected] = useState(false);

  const { data: sessionData } = useSession();

  const { refetch: refetchContacts } = api.contacts.getAll.useQuery(undefined, {
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
    setChecked(true);
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
  useEffect(() => {
    if (checked) {
      setTimeout(() => {
        setChecked(false);
      }, 3000);
    }
  }, [checked, contact.id, createConnection]);

  return (
    <div
      className={`daily-connection-card relative h-52 w-96 p-12 ${
        connected ? "connected" : ""
      }`}
    >
      <h3 className="text-2xl">
        {contact.firstName} {contact.lastName}
      </h3>
      <p className="font-thin">{`Last check-in: 
        ${contact.lastConnectionDate?.toString() ?? ""}
      `}</p>
      <button className="absolute bottom-6 right-6" onClick={handleClick}>
        {checked ? <p>✅</p> : <GiPlantRoots size={40} />}
      </button>
    </div>
  );
}
