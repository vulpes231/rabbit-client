import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";

const Sender = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <section className="min-h-screen w-full p-6">
      <div className="ssize h-[500px] overflow-y-scroll">
        <ProductTable productName={"sender"} />
      </div>
    </section>
  );
};

export default Sender;
