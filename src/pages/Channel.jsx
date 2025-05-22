import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  MdAttachEmail,
  MdHome,
  MdLockPerson,
  MdOutlineArrowOutward,
} from "react-icons/md";
import { FaEyeLowVision, FaUserGear, FaGift } from "react-icons/fa6";
import { RiArchiveStackFill } from "react-icons/ri";

const ChannelCard = ({ icon, channelName, link }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700"
    >
      <div className="p-4 mb-4 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-3xl">
        {icon}
      </div>
      <h4 className="font-medium text-slate-800 dark:text-white text-center mb-4 uppercase text-sm tracking-wider">
        {channelName}
      </h4>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-semibold py-2 px-6 rounded-full transition-all"
      >
        Open Channel
        <MdOutlineArrowOutward className="text-xs" />
      </motion.a>
    </motion.div>
  );
};

const Channel = () => {
  useEffect(() => {
    document.title = "RH4OGS - Channels";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  const channels = [
    {
      icon: <MdHome />,
      name: "Main",
      link: "https://rabbithole4og.com/chat/messages.html",
    },
    {
      icon: <FaUserGear />,
      name: "2FA",
      link: "#",
    },
    {
      icon: <MdAttachEmail />,
      name: "Letter & Attachment",
      link: "#",
    },
    {
      icon: <MdLockPerson />,
      name: "Custom Job",
      link: "#",
    },
    {
      icon: <RiArchiveStackFill />,
      name: "Log & Account",
      link: "#",
    },
    {
      icon: <FaGift />,
      name: "Gift Item",
      link: "#",
    },
    {
      icon: <FaEyeLowVision />,
      name: "Visual Eyes Only",
      link: "#",
    },
  ];

  return (
    <section className="bg-slate-200 dark:bg-slate-900 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Our Channels
          </h2>
          <p className="dark:text-[#979797] text-[#505050] max-w-2xl mx-auto">
            Access our specialized channels for different services and resources
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {channels.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ChannelCard
                icon={channel.icon}
                channelName={channel.name}
                link={channel.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Channel;
