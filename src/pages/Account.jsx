import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";

const Account = () => {
  const { accessToken } = useSelector((state) => state.signin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <section className="min-h-screen w-full p-6">
      <div className="ssize h-[500px] overflow-y-scroll">
        <ProductTable productName={"account"} />
      </div>
    </section>
  );
};

export default Account;
