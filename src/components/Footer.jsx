import React from "react";
import { FaPhone, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();
  const socialLinks = [
    {
      icon: <FaTelegram />,
      color: "text-blue-400 hover:text-blue-500",
      bg: "hover:bg-blue-400/10",
      link: "#",
      tooltip: "Join us on Telegram",
    },
    {
      icon: <FaWhatsapp />,
      color: "text-green-500 hover:text-green-600",
      bg: "hover:bg-green-500/10",
      link: "#",
      tooltip: "Chat on WhatsApp",
    },
    {
      icon: <FaPhone />,
      color: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
      bg: "hover:bg-slate-400/10 dark:hover:bg-slate-200/10",
      link: "#",
      tooltip: "Call us",
    },
  ];

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Social Links with animations */}
          <div className="flex gap-6">
            {socialLinks.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                aria-label={item.tooltip}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`flex items-center justify-center h-12 w-12 rounded-full ${item.bg} ${item.color} transition-all duration-300 relative group`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.tooltip}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Copyright text with subtle animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm text-slate-500 dark:text-slate-400"
          >
            Copyright &copy; {year},{" "}
            <span className="text-red-500 dark:text-red-400 font-semibold">
              Rabbithole4ogs
            </span>{" "}
            • All Rights Reserved
          </motion.p>

          {/* Additional links or legal text */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <motion.a
              href="#"
              whileHover={{ color: "#ef4444" }}
              className="hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#ef4444" }}
              className="hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#ef4444" }}
              className="hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
