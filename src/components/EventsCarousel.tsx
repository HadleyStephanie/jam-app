import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CSSProperties, useRef } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";

const dummyConnections = [
  {
    contact: {
      contactId: 1,
      name: "JoAnn",
      lastConnectionDate: "6/3/23",
    },
  },
  {
    contact: {
      contactId: 2,
      name: "Bob",
      lastConnectionDate: "6/8/23",
    },
  },
  {
    contact: {
      contactId: 3,
      name: "Kate",
      lastConnectionDate: "5/31/23",
    },
  },
  {
    contact: {
      contactId: 4,
      name: "Jim",
      lastConnectionDate: "6/29/23",
    },
  },
  {
    contact: {
      contactId: 5,
      name: "Jam",
      lastConnectionDate: "6/29/23",
    },
  },
];

export default function EventsCarousel() {
  const sliderRef = useRef<Slider>(null);

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

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    dots: false,
    arrows: false,
  };

  return (
    <div className="py-4">
      <h3 className="pb-4 pl-10 text-xl font-extralight">Events</h3>
      <div className="flex items-center">
        <PrevArrow />
        <Slider {...sliderSettings}>
          {dummyConnections.map((connection) => (
            <Card key={`connection-${connection.contact.contactId}`} />
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

function Card() {
  return (
    <div className="event-card relative h-52 w-full bg-gradient-to-r from-cyan-400 from-10% via-cyan-300 via-30% to-cyan-200 pt-8 drop-shadow-lg">
      <div className="h-full w-full rounded-b-lg bg-white p-4">
        <h3 className="pb-2 text-2xl">{`JoAnn's Retirement`}</h3>
        <p>Details</p>
        <p className="font-thin">in 2 days</p>
        <div className="absolute bottom-6 right-6">
          <BsCalendar3 size={40} />
        </div>
      </div>
    </div>
  );
}
