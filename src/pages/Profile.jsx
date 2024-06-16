import React, { useEffect } from "react";
import Userinfo from "../components/profile/Userinfo";
import Changemail from "../components/profile/Changemail";
import Topup from "../components/profile/Topup";
import Contactus from "../components/profile/Contactus";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Status = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <Cove>
      <div className="container px-3">
        <span>
          <h3 className="uppercase font-semibold text-lg text-center pt-10">
            Profile
          </h3>
        </span>
        <div className="flex flex-wrap -m-3 p-3 gap-10">
          <Userinfo />
          <Changemail />
          <Topup />
          <Contactus />
        </div>
      </div>
    </Cove>
  );
};

export default Status;
