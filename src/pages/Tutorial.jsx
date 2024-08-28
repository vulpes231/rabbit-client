import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Tutorial = ({ handleLinks }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        Tutorials
      </h3>
      <p className="text-center">coming soon...</p>
    </TabContainer>
  );
};

export default Tutorial;
