import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Services = ({ handleLinks }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  const myServices = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "service"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        Services
      </h3>
      <ProductTable data={myServices} />
    </TabContainer>
  );
};

export default Services;
