import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Construction from "../components/Construction";
import Userinfo from "../components/profile/Userinfo";
import Changemail from "../components/profile/Changemail";
import Topup from "../components/profile/Topup";
import Contactus from "../components/profile/Contactus";

const Status = () => {
  const { accessToken } = useSelector((state) => state.signin);
  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/signin");
  //   }
  // }, [accessToken]);
  return (
    <section className="min-h-screen w-full rounded-xl">
      <div className="flex flex-col w-full ">
        <div className="flex flex-col gap-4 ">
          <Userinfo />
          <Changemail />
          <Topup />
          <Contactus />
        </div>
      </div>
    </section>
  );
};

export default Status;
