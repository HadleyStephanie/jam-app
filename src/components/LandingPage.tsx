import React from "react";
import LandingPageHeader from "./LandingPageHeader";
import Image from "next/image";
import { BsCheck2Circle, BsHourglassSplit } from "react-icons/bs";
import { signIn } from "next-auth/react";

const LandingPage = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col">
      <Image
        src="/../public/images/calm-desk.jpg"
        alt="Hourglass with black sand that is sitting on a table to the right"
        fill
        className="absolute h-full w-full  object-cover mix-blend-overlay"
      />
      <div className=" mt-4 flex justify-between">
        <div className="ml-5 flex w-1/4 flex-col pl-6 text-slate-900">
          <BsHourglassSplit size={36} className="rotate-12" />
          <span className="text-lg tracking-wide">logo</span>
        </div>
        <button
          className="relative mr-5 h-10 w-28 rounded-full bg-gradient-to-r from-eucalyptus-50 to-eucalyptus-500 px-3 py-0.5 text-center text-lg font-semibold text-slate-900 focus:outline-none"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
      </div>

      <div className="flex h-full w-1/2 flex-col justify-center px-16">
        <h1 className=" text-7xl font-semibold tracking-widest text-slate-100">
          Cultivating
        </h1>
        <h1 className="text-7xl font-semibold tracking-widest text-slate-100">
          Connection
        </h1>
        <p className=" w-3/4 pl-4 pt-4 text-2xl font-light tracking-wide text-slate-900">
          A resource that helps to organize and humanize the connections between
          you and your employees.
        </p>
        <div className="flex w-3/4 justify-center pt-8">
          <button
            className=" relative ml-5 mr-5 w-1/3 rounded-full bg-gradient-to-r from-eucalyptus-50 to-eucalyptus-500 p-1 px-1 text-center text-lg font-semibold text-slate-900 focus:outline-none"
            onClick={() => void signIn()}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="flex justify-start gap-8 px-8 pb-4 text-lg text-slate-900">
        <div className=" flex h-48 w-64 items-center gap-4 px-2">
          <div className="font-semibold">
            <BsCheck2Circle size={36} />
          </div>
          <p>Setup reminders for checking in with your staff</p>
        </div>
        <div className="flex h-48 w-64 items-center gap-4 px-2 ">
          <div className="font-semibold">
            <BsCheck2Circle size={36} />
          </div>
          <p>Increase positive interactions</p>
        </div>
        <div className="flex h-48 w-64 items-center gap-4 px-2 ">
          <div className="font-semibold">
            <BsCheck2Circle size={36} />
          </div>
          <p>Get personalized analytics related to your connections</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
