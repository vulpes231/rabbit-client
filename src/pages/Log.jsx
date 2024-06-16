import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Log = () => {
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
        <ProductTable productName={"log"} />
      </div>
    </Cove>
  );
};

export default Log;
