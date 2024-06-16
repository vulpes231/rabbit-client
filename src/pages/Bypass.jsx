import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import Construction from "../components/Construction";
import { useNavigate } from "react-router-dom";
import accessToken from "../constants";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Bypass = () => {
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
          <h3 className="uppercase font-semibold text-xl text-center pt-10">
            Bypass
          </h3>
        </span>
        <Construction />
      </div>
    </Cove>
  );
};

export default Bypass;
