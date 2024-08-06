import React, { useEffect } from "react";
import Userinfo from "../components/profile/Userinfo";
import Changemail from "../components/profile/Changemail";
import Topup from "../components/profile/Topup";
import Contactus from "../components/profile/Contactus";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Profile = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  useEffect(() => {
    document.title = "RH4OGS - Profile";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);
  return (
    <section>
      <div className="container px-3 lg:max-w-[1000px] mx-auto">
        <h3 className="uppercase font-semibold text-lg text-center pt-10">
          Profile
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 p-3 gap-10">
          <Userinfo />
          <Changemail />
          <Topup />
          <Contactus />
        </div>
      </div>
    </section>
  );
};

export default Profile;
