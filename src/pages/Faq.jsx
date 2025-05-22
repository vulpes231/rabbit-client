import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaMinus,
  FaTelegram,
  FaWhatsapp,
  FaRobot,
} from "react-icons/fa";
import { MdChecklist, MdSupportAgent, MdStore } from "react-icons/md";
import { questionsAndAnswers } from "../constants";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    document.title = "RH4OGS - FAQ";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  return (
    <section className="font-[Montserrat] bg-slate-200 dark:bg-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-28 sm:mt-16 lg:mt-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="dark:text-[#979797] text-[#505050]">
            Find answers to common questions about our services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden">
          {questionsAndAnswers.map((item, index) => (
            <div
              key={index}
              className="border-b border-slate-200 dark:border-slate-700 last:border-b-0"
            >
              <motion.button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 hover:bg-slate-200 dark:hover:bg-slate-900 "
                whileHover={{
                  backgroundColor: [
                    "rgba(255,255,255,0)",
                    "rgba(241,245,249,1)",
                  ],
                }}
              >
                <h3 className="font-medium text-slate-800 dark:text-white text-sm sm:text-base flex-1">
                  {item.question}
                </h3>
                {activeIndex === index ? (
                  <FaMinus className="text-red-500 text-xs" />
                ) : (
                  <FaPlus className="text-red-500 text-xs" />
                )}
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {item.answer.split("\n").map((paragraph, i) => (
                        <p key={i} className="mb-3 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Support Channels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <SupportChannel
            title="Admin Support"
            icon={<MdSupportAgent className="text-red-500 text-xl" />}
            color="bg-red-50 dark:bg-red-900/20"
          />
          <SupportChannel
            title="Main Channel"
            icon={<FaTelegram className="text-green-500 text-xl" />}
            color="bg-green-50 dark:bg-green-900/20"
          />
          <SupportChannel
            title="Telegram Bot"
            icon={<FaRobot className="text-yellow-500 text-xl" />}
            color="bg-yellow-50 dark:bg-yellow-900/20"
          />
          <SupportChannel
            title="WhatsApp"
            icon={<FaWhatsapp className="text-blue-500 text-xl" />}
            color="bg-blue-50 dark:bg-blue-900/20"
          />
          <SupportChannel
            title="Vendor Onboarding"
            icon={<MdStore className="text-purple-500 text-xl" />}
            color="bg-purple-50 dark:bg-purple-900/20"
          />
        </motion.div>
      </div>
    </section>
  );
};

// eslint-disable-next-line react/prop-types
const SupportChannel = ({ title, icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${color} p-4 rounded-lg flex items-center gap-3 shadow-sm cursor-pointer`}
    >
      <div className="p-2 rounded-full bg-white dark:bg-slate-700 shadow">
        {icon}
      </div>
      <span className="font-medium text-sm text-slate-800 dark:text-white">
        {title}
      </span>
    </motion.div>
  );
};

export default Faq;
