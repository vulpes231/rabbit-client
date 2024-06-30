import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Sender = ({ toggle }) => {
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
    <TabContainer toggle={toggle}>
      <ProductTable title={"buy"} data={mySender} />
    </TabContainer>
  );
};

export default Sender;
