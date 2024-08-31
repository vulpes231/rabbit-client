import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import TabContainer from "./TabContainer";

const Tutorial = () => {
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
