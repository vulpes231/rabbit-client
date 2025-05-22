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
import { motion } from "framer-motion";

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
  }, [accessToken, dispatch, navigate]);

  return (
    <section className="font-[Montserrat] bg-slate-200 dark:bg-slate-800">
      <div className="container px-3 lg:max-w-[1200px] mx-auto mt-40 sm:mt-28 lg:mt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Profile
          </h2>
          <p className="dark:text-[#979797] text-[#505050] max-w-2xl mx-auto">
            Manage your profile settings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 pb-5">
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
