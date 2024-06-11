import React, { useEffect } from "react";
import Userinfo from "../components/profile/Userinfo";
import Changemail from "../components/profile/Changemail";
import Topup from "../components/profile/Topup";
import Contactus from "../components/profile/Contactus";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";

const Status = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <section className="min-h-screen w-full rounded-xl z-10">
      <div className="flex flex-col w-full mt-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap ">
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
