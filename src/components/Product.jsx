import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Product = ({ icon, title, content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="relative overflow-hidden border border-slate-200 dark:border-slate-700 p-6 rounded-xl flex flex-col gap-6 bg-white dark:bg-slate-900 hover:border-red-500/30 hover:dark:border-red-400/30 transition-all duration-300 group"
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-500/5 dark:to-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />

      <article className="flex flex-col gap-6 z-10">
        <header className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-red-500/10 dark:bg-red-400/10 text-red-600 dark:text-red-400 group-hover:bg-red-500/20 dark:group-hover:bg-amber-400/20 transition-colors">
            <span className="text-3xl">{icon}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wide mt-1">
            {title}
          </h3>
        </header>

        <ul className="text-sm text-slate-600 dark:text-slate-300 flex flex-col gap-3 pl-1">
          {React.Children.map(content, (item, index) => (
            <motion.li
              key={index}
              className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-amber-500 dark:before:bg-amber-400"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </article>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="z-10"
      >
        <Link
          to="/signin"
          className="flex justify-center items-center font-medium text-sm px-6 py-3 gap-2 w-full rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg hover:shadow-red-500/20 dark:hover:shadow-red-400/20"
        >
          <span>Purchase</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Product;
