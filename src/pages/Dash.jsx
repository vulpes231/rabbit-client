import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Authnav, LabelIcon } from "../components";
import { Md10Mp, Md18Mp } from "react-icons/md";
import {
  FaAward,
  FaCalendar,
  FaClock,
  FaGift,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";

const Dash = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.signin);

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/signin");
  //   }
  // }, [accessToken]);

  return (
    <section className="bg-black text-white min-h-screen w-full p-6">
      <div className="flex flex-col lg:max-w-[1000px] mx-auto gap-10">
        <Authnav />
        <div className="flex flex-col gap-10">
          <article className="flex flex-col gap-6 items-center justify-center">
            <LabelIcon icon={<Md10Mp />} title={"total orders"} />
            <span className="flex items-center gap-2">
              0 <Md18Mp />
            </span>
          </article>
          <article className="flex flex-col gap-6 items-center justify-center">
            <LabelIcon icon={<FaTrophy />} title={"earned XP"} />
            <span className="flex items-center gap-2">
              0 <FaAward />
            </span>
          </article>
        </div>
        <div className="flex flex-col gap-5">
          <span>
            <LabelIcon icon={<FaClock />} title={"last login:"} />
          </span>
          <span>
            <LabelIcon icon={<FaCalendar />} title={"joined:"} />
          </span>
        </div>
        <div className="flex flex-col gap-5 my-10">
          <h3 className="text-center">Welcome User</h3>
          <span className="flex flex-col">
            $0 <small>balance</small>
          </span>
        </div>
        <div className="flex flex-col gap-5 my-10">
          <span className=" flex justify-between items-center">
            <p>RDP(s)</p>
            <p className="text-slate-500 capitalize">view all</p>
          </span>
          <p className="text-center">No data available in table</p>
        </div>
        <div className="flex flex-col gap-5 my-10">
          <span className=" flex justify-between items-center capitalize">
            <p>invoice</p>
            <p>amount</p>
            <p>value</p>
          </span>
          <p className="text-center">No data available in table</p>
        </div>
        <div className="flex flex-col gap-5 my-10">
          <span className=" flex justify-between items-center">
            <p>Transactions</p>
            <p className="text-slate-500 capitalize">view all</p>
          </span>
          <p className="text-center">No data available in table</p>
        </div>
        <div className="flex flex-col gap-5 my-10">
          <h3>invite a friend</h3>
          <span className="">
            <LabelIcon icon={<FaGift />} title={"Earnings:"} />
            <small className="text-green-500 text-xl font-semibold">$0</small>
          </span>
          <span>
            <LabelIcon icon={<FaUserFriends />} title={"Friends Invited:"} />
            <small className="text-red-500 text-xl font-semibold">0</small>
          </span>
          <p className="text-center">localhost:400?r=1234567a</p>
          <button className="text-center border-2 py-2">Go to referrals</button>
        </div>
      </div>
    </section>
  );
};

export default Dash;
