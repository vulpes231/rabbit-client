import React, { useEffect } from "react";
import Construction from "../components/Construction";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
const Web3 = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <section className="min-h-screen w-full  bg-slate-700 bg-opacity-30 rounded-xl p-6">
      <div>
        <span>
          <h3 className="uppercase font-semibold text-xl text-center pt-10">
            Web3
          </h3>
        </span>
        <Construction />
      </div>
    </section>
  );
};

export default Web3;
