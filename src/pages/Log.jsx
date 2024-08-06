import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Log = ({ handleLinks }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  // Filter products that have the category "Log"
  const myLog = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "spammed logs"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <ProductTable data={myLog} />
    </TabContainer>
  );
};

export default Log;
