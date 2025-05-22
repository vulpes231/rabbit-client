import React from "react";
import { motion } from "framer-motion";
import { MdSupportAgent, MdEmail } from "react-icons/md";
import Container from "./Container";
import { Link } from "react-router-dom";

const Contactus = () => {
  return (
    <Container
      icon={<MdSupportAgent className="text-blue-500" />}
      title="Contact Support"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <Link
          to="/tickets"
          className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500 dark:text-blue-400">
            <MdSupportAgent className="text-lg" />
          </div>
          <span className="font-medium dark:text-white">
            Open Support Ticket
          </span>
        </Link>

        <Link
          to="/contact"
          className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500 dark:text-blue-400">
            <MdEmail className="text-lg" />
          </div>
          <span className="font-medium dark:text-white">Send Email</span>
        </Link>
      </motion.div>
    </Container>
  );
};

export default Contactus;
