import React from "react";
import { Md10Mp, Md18Mp } from "react-icons/md";
import {
  FaAward,
  FaCalendar,
  FaClock,
  FaGift,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";
import { LabelIcon } from "../components";

const Dashcontent = ({ user, formattedDate, memberSince }) => {
  return (
    <div className="flex flex-col lg:max-w-[1000px] mx-auto gap-10 lg:flex-row lg:flex-wrap lg:mt-10">
      <div className="flex flex-col gap-10  lg:w-[300px]">
        <article className="flex flex-col gap-6 items-center justify-center bg-slate-400 bg-opacity-10 w-full mx-auto p-4 rounded-md">
          <LabelIcon icon={<Md10Mp />} title={"total orders"} />
          <span className="flex items-center gap-2">
            {user?.orders || 0} <Md18Mp />
          </span>
        </article>
        <article className="flex flex-col gap-6 items-center justify-center bg-slate-400 bg-opacity-10 w-full mx-auto p-4 rounded-md">
          <LabelIcon icon={<FaTrophy />} title={"earned XP"} />
          <span className="flex items-center gap-2">
            {user?.earnedXP || 0} <FaAward />
          </span>
        </article>
      </div>
      <div className="flex flex-col gap-5 text-xs font-thin opacity-50 lg:w-[300px]">
        <span className="flex gap-2 items-center">
          <LabelIcon icon={<FaClock />} title={"last login:"} />
          {formattedDate}
        </span>
        <span className="flex gap-2 items-center">
          <LabelIcon icon={<FaCalendar />} title={"member since:"} />
          <p className="capitalize">{memberSince}</p>
        </span>
      </div>
      <div className="flex flex-col gap-5 my-10 lg:w-[300px]">
        <h3 className=" text-2xl uppercase font-thin">
          Welcome {user?.username}
        </h3>
        <span className="flex flex-col text-xl">
          $ 0.00{" "}
          <small className="text-xs capitalize opacity-50">balance</small>
        </span>
      </div>
      <div className="flex flex-col gap-5 my-10 bg-slate-400 bg-opacity-10 p-4 rounded-md lg:w-[300px]">
        <span className=" flex justify-between items-center">
          <p>RDP(s)</p>
          <p className="text-slate-500 capitalize">view all</p>
        </span>
        <hr className="text-white bg-white" />
        <p className="text-center text-xs opacity-50">
          No data available in table
        </p>
      </div>
      <div className="flex flex-col gap-5 my-10 bg-slate-400 bg-opacity-10 p-4 rounded-md lg:w-[300px]">
        <span className=" flex justify-between items-center uppercase font-bold text-sm">
          <p>invoice</p>
          <p>amount</p>
          <p>value</p>
        </span>
        <hr className="text-white bg-white" />
        <p className="text-center text-xs opacity-50">
          No data available in table
        </p>
      </div>
      <div className="flex flex-col gap-5 my-10 bg-slate-400 bg-opacity-10 p-4 rounded-md lg:w-[300px]">
        <span className=" flex justify-between items-center">
          <p>Transactions</p>
          <p className="text-slate-500 capitalize">view all</p>
        </span>
        <hr className="text-white bg-white" />
        <p className="text-center text-xs opacity-50">
          No data available in table
        </p>
      </div>
      <div className="flex flex-col gap-5 my-10 bg-slate-400 bg-opacity-10 p-4 rounded-md lg:w-[300px]">
        <h3 className="capitalize ">invite a friend</h3>
        <hr className="text-white bg-white" />
        <span className="text-sm opacity-80">
          <LabelIcon icon={<FaGift />} title={"Earnings:"} />
          <small className="text-green-500 text-xl font-semibold">$0</small>
        </span>
        <span className="text-sm opacity-80">
          <LabelIcon icon={<FaUserFriends />} title={"Friends Invited:"} />
          <small className="text-red-500 text-xl font-semibold">0</small>
        </span>
        <p className="text-center text-red-500 underline text-sm cursor-pointer">
          localhost:400?r=1234567a
        </p>
        <button className="text-center border-2 py-2">Go to referrals</button>
      </div>
    </div>
  );
};

export default Dashcontent;