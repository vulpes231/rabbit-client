import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";

import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";
import { getAccessToken } from "../constants";

const Extractor = ({ handleLinks }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  const myAccount = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "extractor"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        Extractor + Sorters
      </h3>
      <ProductTable data={myAccount} />
    </TabContainer>
  );
};

export default Extractor;
