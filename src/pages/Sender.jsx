import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../constants";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Sender = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  // Filter products that have the category "Sender"
  const mySender = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "sender"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        senders
      </h3>
      <ProductTable data={mySender} />
    </TabContainer>
  );
};

export default Sender;
