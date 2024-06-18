import React from "react";
// import { useSelector } from "react-redux";
// useSelector

const LogoutModal = () => {
  return (
    <div className="fixed w-full h-screen flex flex-col items-center justify-center top-0 left-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div>
        <div className="loader" />
        <p>Logging out user...</p>
      </div>
    </div>
  );
};

export default LogoutModal;
