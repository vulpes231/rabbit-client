/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MdDiscount, MdOutlinePriceChange } from "react-icons/md";
import { FaCalendar, FaClock, FaGift, FaUserFriends } from "react-icons/fa";
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
import Calendar from "./Calendar";
import { motion } from "framer-motion";

const DashboardCard = ({ children, className = "", ...props }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 transition-all ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const StatCard = ({ icon, title, value, path }) => (
  <Link to={path}>
    <DashboardCard className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-red-500 text-2xl">{icon}</span>
        <h3 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </h3>
      </div>
      <p className="text-3xl font-bold dark:text-white">{value}</p>
    </DashboardCard>
  </Link>
);

const Content = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { balance } = useSelector((state) => state.wallet);
  const { user } = useSelector((state) => state.user);

  const lastLogin = JSON.parse(sessionStorage.getItem("lastLogin"));
  const joinDate = sessionStorage.getItem("joinDate");

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
      dispatch(getUserBalance());
    }
  }, [accessToken, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] lg:pt-0 py-8">
      {/* Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard className="lg:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold dark:text-white mb-2">
                Welcome back, {user?.username}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-500">
                  ${(balance && balance.toFixed(2)) || "0.00"}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Available Balance
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaClock className="text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Last login: {lastLogin}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendar className="text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Member since: {joinDate}
                </span>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <Calendar />
        </DashboardCard>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<MdDiscount />}
          title="Pending Orders"
          value={user?.pendingOrders || 0}
          path="/order"
        />
        <StatCard
          icon={<MdOutlinePriceChange />}
          title="Completed Orders"
          value={user?.completedOrders || 0}
          path="/completed"
        />
        <DashboardCard className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-700 dark:text-slate-300">
              RDP(s)
            </h3>
            <Link
              to="/rdp"
              className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400"
            >
              View All
            </Link>
          </div>
          <div className="text-center py-8">
            <p className="text-sm text-slate-400">No data available</p>
          </div>
        </DashboardCard>
        <DashboardCard className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-700 dark:text-slate-300">
              Transactions
            </h3>
            <Link
              to="/transactions"
              className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400"
            >
              View All
            </Link>
          </div>
          <div className="text-center py-8">
            <p className="text-sm text-slate-400">No data available</p>
          </div>
        </DashboardCard>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-700 dark:text-slate-300">
              Recent Invoices
            </h3>
            <div className="flex gap-6">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                INVOICE
              </span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                AMOUNT
              </span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                VALUE
              </span>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-sm text-slate-400">No data available</p>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex flex-col h-full">
            <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
              Invite a Friend
            </h3>
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <FaGift className="text-red-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Earnings
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-500">$0</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <FaUserFriends className="text-red-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Friends Invited
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-red-500">0</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-3">
                  Your referral link:
                </p>
                <p className="text-xs text-center text-red-500 break-all mb-4">
                  {`https://rabbithole4og.com/?r=${user?.username}rhs4og`}
                </p>
                <Link
                  to="/referrals"
                  className="block w-full py-2 text-center text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Go to Referrals
                </Link>
              </div>
            </div>
          </div>
        </DashboardCard>
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
    <div className="overflow-auto w-full lg:max-w-[1200px] lg:mx-auto mt-10 sm:mt-5 lg:mt-10">
      {activeLink === "redirect" && <Linktool />}
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
