import React, { useEffect } from "react";
import { MdDiscount, MdOutlinePriceChange } from "react-icons/md";
import { FaCalendar, FaClock, FaGift, FaUserFriends } from "react-icons/fa";
import { LabelIcon } from "../components";
import Article from "./dash/Article";
import Span from "./dash/Span";
import Dashdiv from "./dash/Dashdiv";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/getDate";
import { getUser } from "../features/userSlice";

const Dashcontent = ({ user, formattedDate, memberSince, toggle, userBal }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return (
    <div
      className={
        toggle
          ? "ml-[60%] md:ml-[40%] flex-grow"
          : "ml-0 lg:ml-[250px] flex-grow"
      }
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-10 w-full p-6  lg:flex-row">
          <Article>
            <LabelIcon
              icon={<MdDiscount />}
              title={"pending orders"}
              iconSize={"text-3xl"}
            />
            <small className="font-bold text-3xl">
              {user?.pendingOrders || 0}
            </small>
          </Article>
          <Article>
            <LabelIcon
              icon={<MdOutlinePriceChange />}
              title={"completed orders"}
              iconSize={"text-3xl"}
            />
            <small className="font-bold text-3xl">
              {user?.completedOrders || 0}
            </small>
          </Article>
        </div>

        <div className="flex flex-col gap-10 rounded-lg w-full px-8 lg:flex-row ">
          <Span>
            <div className="flex items-center gap-2 capitalize">
              <FaClock />
              <small>last login: {formattedDate}</small>
            </div>
          </Span>
          <Span>
            <div className="flex items-center gap-2 capitalize">
              <FaCalendar />
              <small>member since: {memberSince}</small>
            </div>
          </Span>
        </div>

        <div className="flex flex-col gap-5 px-8">
          <h3 className=" text-2xl uppercase font-thin">
            Welcome {user?.username}
          </h3>
          <span className="flex flex-col text-xl">
            {userBal.toFixed(2)}
            <small className="text-xs capitalize opacity-50">balance</small>
          </span>
        </div>

        <div className="grid gap-5 px-8 md:grid-cols-2 lg:grid-cols-3">
          <Dashdiv>
            <span className=" flex justify-between items-center">
              <p>RDP(s)</p>
              <p className="text-slate-500 capitalize">view all</p>
            </span>
            <hr className="text-white bg-white" />
            <p className="text-center text-xs opacity-50">
              No data available in table
            </p>
          </Dashdiv>

          <Dashdiv>
            <span className=" flex justify-between items-center uppercase font-bold text-sm">
              <p>invoice</p>
              <p>amount</p>
              <p>value</p>
            </span>
            <hr className="text-white bg-white" />
            <p className="text-center text-xs opacity-50">
              No data available in table
            </p>
          </Dashdiv>

          <Dashdiv>
            <span className=" flex justify-between items-center">
              <p>Transactions</p>
              <p className="text-slate-500 capitalize">view all</p>
            </span>
            <hr className="text-white bg-white" />
            <p className="text-center text-xs opacity-50">
              No data available in table
            </p>
          </Dashdiv>
        </div>

        <div className="flex flex-col gap-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mx-8 p-4 md:w-[45%] rounded-md ">
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
    </div>
  );
};

export default Dashcontent;
