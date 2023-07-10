import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";

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
          {dummyConnections.map((connection) => (
            <Card
              key={`connection-${connection.contact.contactId}`}
              connection={connection}
            />
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

function Card({ connection }: { connection: Connection }) {
  return (
    <div className="daily-connection-card relative h-52 w-96 p-12">
      <h3 className="text-2xl">
        {connection.contact.name} {connection.contact.lastName}
      </h3>
      <p className="font-thin">{`Last check-in: ${connection.contact.lastConnectionDate}`}</p>
      <div className="absolute bottom-6 right-6">
        <GiPlantRoots size={40} />
      </div>
    </div>
  );
}
