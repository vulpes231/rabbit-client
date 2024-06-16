import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
// import Cove from "../components/Cove";

const Services = ({ toggle }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <div
      className={
        toggle
          ? "ml-[60%] md:ml-[40%]"
          : "ml-0 lg:ml-[250px] flex-grow overflow-hidden"
      }
    >
      <div className="container px-3">
        <ProductTable productName={"service"} />
      </div>
    </div>
  );
};

export default Services;
