import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";
import { type Contact } from "@prisma/client";
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

export default function DailyCarousel() {
  const sliderRef = useRef<Slider>(null);

  const { data: sessionData } = useSession();

  const { data: contacts, refetch: refetchContacts } =
    api.contacts.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });
  const [checkedCards, setCheckCards] = useState<string[]>([]);

  const contactList = useMemo(() => {
    return contacts?.filter((contact) => {
      if (!contact.lastConnectionDate) return true;
      const diff = Date.now() - contact.lastConnectionDate.getTime();
      return diff >= (contact.connectionThreshold ?? 7) * 24 * 60 * 60 * 1000;
    });
  }, [contacts]);

  const sortedConnections = useMemo(() => {
    return contacts?.sort((a, b) => {
      if (!a.lastConnectionDate) {
        return -1;
      }

      if (!b.lastConnectionDate) {
        return 1;
      }

      if (a.lastConnectionDate.getTime() < b.lastConnectionDate.getTime()) {
        return -1;
      }

      return 1;
    });
  }, [contacts]);

  const NextArrow = () => {
    return (
      <button
        className="flex h-8 w-8 items-center justify-center"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <FaChevronCircleRight />
      </button>
    );
  };

  const PrevArrow = () => {
    return (
      <button
        className="flex h-8 w-8 items-center justify-center"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <FaChevronCircleLeft />
      </button>
    );
  };

  const slider = useMemo(() => {
    const sliderSettings = {
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      dots: false,
      arrows: false,
    };

    return (
      <Slider ref={sliderRef} {...sliderSettings}>
        {sortedConnections?.map((contact) => (
          <Card
            key={contact.id}
            contact={contact}
            checked={checkedCards}
            setChecked={setCheckCards}
          />
          // <div key={`connection-${connection.contact.contactId}`}>
          //   <h2>{connection.contact.name}</h2>
          //   <p>{connection.contact.lastConnectionDate}</p>
          // </div>
        ))}
      </Slider>
    );
  }, [checkedCards, sortedConnections]);

  return (
    <div className="py-4">
      <h3 className="pb-4 pl-10 text-xl font-extralight">Daily Connections</h3>
      <div className="flex w-full items-center">
        <PrevArrow />
        {slider}
        <NextArrow />
      </div>
    </div>
  );
}

function Card({
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
      className={`daily-connection-card relative h-52 w-full bg-gradient-to-r from-emerald-400 from-10% via-emerald-300 via-30% to-emerald-200 pt-8 drop-shadow-lg `}
    >
      <div className="h-full w-full rounded-b-lg bg-white p-4">
        <h3 className="pb-2 text-2xl">
          {contact.firstName} {contact.lastName}
        </h3>
        <p className="font-thin">{`Last check-in: 
        ${contact.lastConnectionDate?.toDateString() ?? ""}
      `}</p>
        <button className="absolute bottom-6 right-6" onClick={handleClick}>
          {checked.includes(contact.id) ? (
            <p>✅</p>
          ) : (
            <GiPlantRoots size={40} />
          )}
        </button>
      </div>
    </div>
  );
}

// const dummyConnections: Connection[] = [
//   {
//     contact: {
//       contactId: 1,
//       name: "JoAnn",
//       lastName: "Walters",
//       lastConnectionDate: "6/3/23",
//     },
//   },
//   {
//     contact: {
//       contactId: 2,
//       name: "Bob",
//       lastName: "Builder",
//       lastConnectionDate: "6/8/23",
//     },
//   },
//   {
//     contact: {
//       contactId: 3,
//       name: "Kate",
//       lastName: "Blanchett",
//       lastConnectionDate: "5/31/23",
//     },
//   },
//   {
//     contact: {
//       contactId: 4,
//       name: "Jim",
//       lastName: "Halpert",
//       lastConnectionDate: "6/29/23",
//     },
//   },
//   {
//     contact: {
//       contactId: 5,
//       name: "Jam",
//       lastName: "Balpert",
//       lastConnectionDate: "6/29/23",
//     },
//   },
// ];
