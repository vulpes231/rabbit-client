import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Sender = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <Cove className="min-h-screen w-full p-6">
      <div className="container px-3">
        <ProductTable productName={"sender"} />
      </div>
    </Cove>
  );
};

export default Sender;
