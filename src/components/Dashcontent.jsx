import React, { useEffect, useState } from "react";
import { MdDiscount, MdOutlinePriceChange } from "react-icons/md";
import { FaCalendar, FaClock, FaGift, FaUserFriends } from "react-icons/fa";
import { LabelIcon } from "../components";
import Article from "./dash/Article";
import Span from "./dash/Span";
import Dashdiv from "./dash/Dashdiv";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getUser } from "../features/userSlice";
import { getUserBalance } from "../features/walletSlice";
import Linktool from "../pages/Linktool";
import Resume from "../pages/Resume";
import Server from "../pages/Server";
import Services from "../pages/Services";
import Script from "../pages/Script";
import Log from "../pages/Log";
import Account from "../pages/Account";
import Bypass from "../pages/Bypass";
import Sender from "../pages/Sender";
import Web3 from "../pages/Web3";
import Attachment from "../pages/Attachment";
import Tutorial from "../pages/Tutorial";
import Developer from "../pages/Developer";
import Smtp from "../pages/Smtp";
import Leads from "../pages/Leads";
import Extractor from "../pages/Extractor";
import Deepfake from "../pages/Deepfake";
import { Link } from "react-router-dom";

const Content = () => {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.wallet);
  const { user } = useSelector((state) => state.user);

  const [lastLogin, setLastLogin] = useState(false);

  const currentdate = new Date();
  const formatteddate = currentdate.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const accessToken = getAccessToken();
  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
      dispatch(getUserBalance());
    }
    setLastLogin(formatteddate);
  }, [accessToken, dispatch, formatteddate]);
  return (
    <div className="flex flex-col gap-5 mt-28 sm:mt-16 lg:mt-0">
      <div className="flex flex-col gap-10 w-full p-2 lg:flex-row">
        <Article path={"/order"}>
          <LabelIcon
            icon={<MdDiscount />}
            title={"pending orders"}
            iconSize={"text-3xl"}
          />
          <small className="font-bold text-3xl">
            {user?.pendingOrders || 0}
          </small>
        </Article>
        <Article path={"/completed"}>
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

      <div className="flex flex-col gap-4 rounded-lg w-full px-8 lg:flex-row ">
        <Span>
          <div className="flex items-center gap-2 capitalize">
            <FaClock />
            <small className="flex flex-col md:flex-row md:items-center">
              last login: <span>{lastLogin}</span>
            </small>
          </div>
        </Span>
        <Span>
          <div className="flex items-center gap-2 capitalize">
            <FaCalendar />
            <small>member since: 1985</small>
          </div>
        </Span>
      </div>

      <div className="flex flex-col gap-5 px-8">
        <h3 className=" text-2xl uppercase font-thin">
          Welcome {user?.username}
        </h3>
        <span className="flex flex-col text-xl">
          {(balance && balance.toFixed(2)) || 0} USD
          <small className="text-xs capitalize opacity-50">balance</small>
        </span>
      </div>

      <div className="grid gap-5 p-2 md:grid-cols-2 lg:grid-cols-3">
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

      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 p-2 ">
        <div className="flex flex-col gap-4 bg-white dark:bg-slate-950">
          <h3 className="capitalize pt-2 px-4">invite a friend</h3>
          <hr className="border dark:border-slate-800 border-slate-200" />
          <span className="text-sm opacity-80 flex flex-col items-center justify-center">
            <LabelIcon icon={<FaGift />} title={"Earnings:"} />
            <small className="text-green-500 text-xl font-semibold">$0</small>
          </span>
          <span className="text-sm opacity-80 flex flex-col items-center justify-center">
            <LabelIcon icon={<FaUserFriends />} title={"Friends Invited:"} />
            <small className="text-red-500 text-xl font-semibold">0</small>
          </span>
          <small className="text-center text-red-500 underline text-xs cursor-pointer">
            {`https://rabbithole4og.com/?r=${user?.username}rhs4og`}
          </small>
          <Link className="text-center border py-2 m-3 dark:border-slate-600 border-slate-200">
            Go to referrals
          </Link>
        </div>
      </div>
    </div>
  );
};

/* eslint-disable react/prop-types */
const Dashcontent = ({ activeLink }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return (
    <div className="overflow-auto w-full">
      {activeLink === "redirect" && <Linktool />}
      {/* {activeLink === "link" && <Linktool />} */}
      {activeLink === "rdp" && <Server />}
      {activeLink === "office" && <Log />}
      {activeLink === "attachment" && <Attachment />}
      {activeLink === "tutorial" && <Tutorial />}
      {activeLink === "resume" && <Resume />}
      {activeLink === "social" && <Account />}
      {activeLink === "financial" && <Services />}
      {activeLink === "malware" && <Script />}
      {activeLink === "drainer" && <Web3 />}
      {activeLink === "2fa" && <Bypass />}
      {activeLink === "sender" && <Sender />}
      {activeLink === "dash" && <Content />}
      {activeLink === "developer" && <Developer />}
      {activeLink === "smtp" && <Smtp />}
      {activeLink === "leads" && <Leads />}
      {activeLink === "extractor" && <Extractor />}
      {activeLink === "video" && <Deepfake />}
    </div>
  );
};

export default Dashcontent;
