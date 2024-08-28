import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAccessToken } from "../utils/getDate";

import TabContainer from "./TabContainer";

import Twofactor from "../components/Twofactor";

const Bypass = ({ handleLinks }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Twofactor
          title={"office365 2fa link"}
          monthlyPrice={400}
          dailyPrice={350}
        />
        <Twofactor
          title={"gmail 2fa link"}
          monthlyPrice={400}
          dailyPrice={350}
        />
        <Twofactor
          title={"yahoo 2fa link"}
          monthlyPrice={400}
          dailyPrice={350}
        />
        <Twofactor
          title={"custom 2fa link"}
          monthlyPrice={400}
          dailyPrice={350}
        />
      </div>
    </TabContainer>
  );
};

export default Bypass;
