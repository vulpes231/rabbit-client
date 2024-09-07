import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../constants";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Script = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  // Filter products that have the category "Script"
  const myScript = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "malware"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        custom
      </h3>
      <ProductTable data={myScript} />
    </TabContainer>
  );
};

export default Script;
