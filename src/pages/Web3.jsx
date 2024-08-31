import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../constants";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Web3 = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  // Filter products that have the category "Drainer"
  const myDrainer = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "drainer"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        Drainers
      </h3>
      <h3 className="capitalize mt-3">
        for more info:{" "}
        <Link
          to={"https://t.me/rabbitholecustom/22"}
          className="underline text-red-500"
          target="_blank"
        >
          visit our channel.
        </Link>
      </h3>
      <ProductTable data={myDrainer} />
    </TabContainer>
  );
};

export default Web3;
