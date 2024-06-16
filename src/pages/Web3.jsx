import React, { useEffect } from "react";
import Construction from "../components/Construction";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";
const Web3 = () => {
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
            Web3
          </h3>
        </span>
        <Construction />
      </div>
    </Cove>
  );
};

export default Web3;
