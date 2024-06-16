import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Account = () => {
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
        <ProductTable productName={"account"} />
      </div>
    </Cove>
  );
};

export default Account;
