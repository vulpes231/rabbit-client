import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import TabContainer from "./TabContainer";
import Twofactor from "../components/Twofactor";
import { email, gg, soft, yh } from "../assets";

const Bypass = () => {
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
        2FA bypass
      </h3>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        <Twofactor
          title={"office365 2fa link"}
          monthlyPrice={400}
          dailyPrice={300}
          img={soft}
        />
        <Twofactor
          title={"gmail 2fa link"}
          monthlyPrice={400}
          dailyPrice={300}
          img={gg}
        />
        <Twofactor
          title={"yahoo 2fa link"}
          monthlyPrice={400}
          dailyPrice={300}
          img={yh}
        />
        <Twofactor
          title={"custom 2fa link"}
          monthlyPrice={400}
          dailyPrice={300}
          img={email}
        />
      </div>
    </TabContainer>
  );
};

export default Bypass;
