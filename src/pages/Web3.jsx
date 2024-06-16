import React, { useEffect } from "react";
import Construction from "../components/Construction";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
// import Cove from "../components/Cove";

const Web3 = ({ toggle }) => {
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
      <div className="container px-3">
        <span>
          <h3 className="uppercase font-semibold text-xl text-center pt-10">
            Web3
          </h3>
        </span>
        <Construction />
      </div>
    </div>
  );
};

export default Web3;
