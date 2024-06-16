import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import Construction from "../components/Construction";
import { useNavigate } from "react-router-dom";
import accessToken from "../constants";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Bypass = ({ toggle }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <div
      className={
        toggle
          ? "ml-[60%] md:ml-[40%]"
          : "ml-0 lg:ml-[250px] flex-grow overflow-hidden"
      }
    >
      <div className="w-full space-y-5 min-h-screen">
        <span>
          <h3 className="uppercase font-semibold text-xl text-center pt-10">
            Bypass
          </h3>
        </span>
        <Construction />
      </div>
    </div>
  );
};

export default Bypass;
