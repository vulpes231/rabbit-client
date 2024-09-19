import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import TabContainer from "./TabContainer";
import { useSelector } from "react-redux";
import ProductTable from "../components/ProductTable";

const Tutorial = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  const myAccount = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "tutorial"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        Tutorials
      </h3>
      <ProductTable data={myAccount} />
    </TabContainer>
  );
};

export default Tutorial;
