import React, { useEffect } from "react";
import Sidelink from "./Sidelink";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/logoutSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.logout);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (success) {
      //   localStorage.clear();
      sessionStorage.clear();
      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      window.location.reload();
    }
  }, [success]);
  return (
    <span onClick={handleLogout}>
      <Sidelink icon={<MdLogout />} title={"logout"} />
    </span>
  );
};

export default Logout;
