import React, { useEffect } from "react";
import Userinfo from "../components/profile/Userinfo";
import Changemail from "../components/profile/Changemail";
import Topup from "../components/profile/Topup";
import Contactus from "../components/profile/Contactus";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
import { getUserBalance } from "../features/walletSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { user } = useSelector((state) => state.user);
  const { balance } = useSelector((state) => state.wallet);

  // console.log(balance);

  useEffect(() => {
    document.title = "RH4OGS - Profile";
    if (!accessToken) {
      navigate("/signin");
    } else {
      dispatch(getUser());
      dispatch(getUserBalance());
    }
  }, [accessToken]);

  return (
    <section className="font-[Montserrat]">
      <div className="container px-3 lg:max-w-[1000px] mx-auto">
        <h3 className="uppercase font-semibold text-lg text-center pt-10">
          Profile
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
          <Userinfo user={user} bal={balance} />
          <Topup bal={balance} />
          <Contactus />
          <Changemail user={user} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
