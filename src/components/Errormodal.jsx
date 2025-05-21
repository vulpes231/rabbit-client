/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

const ErrorModal = ({ error, setError }) => {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, setError]);

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed top-6 right-6 z-50"
        >
          <div className="w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border-l-4 border-red-500 dark:border-red-400">
            <div className="p-4 flex items-start gap-3">
              <div className="flex-shrink-0 p-2 rounded-full bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-400">
                <FaExclamationTriangle className="text-lg" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    Error
                  </h3>
                  <button
                    onClick={() => setError(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {error}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-1 bg-red-500 dark:bg-red-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
