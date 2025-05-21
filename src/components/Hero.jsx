import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-900 dark:to-black">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          {/* Main headline with animated gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600 dark:from-red-400 dark:to-purple-500"
          >
            Your one stop shop for
            <br />
            <motion.span
              className="inline-block mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              everything an OG needs
            </motion.span>
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent dark:via-red-400 my-6 rounded-full"
          />

          {/* Subtext with animated hearts */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 font-light flex items-center"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
              className="inline-block mx-1 text-red-500"
            >
              💜
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 2.2 }}
              className="inline-block mx-1 text-red-500"
            >
              💜
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 2.4 }}
              className="inline-block mx-1 text-red-500"
            >
              💜
            </motion.span>
            c:/Bishop.&apos;
          </motion.p>

          {/* Security badge with hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
          >
            <RiSecurePaymentFill className="text-2xl text-red-500 dark:text-red-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              We don't keep logs • Zero tracking • End-to-end encrypted
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-10"
          >
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-red-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-red-500/30 transition-all"
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
