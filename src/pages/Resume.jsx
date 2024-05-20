import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Construction from "../components/Construction";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";

const Resume = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.signin);
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <section className="min-h-screen w-full bg-slate-700 bg-opacity-30 rounded-xl p-6">
      <div className="ssize h-[500px] overflow-y-scroll">
        <ProductTable productName={"resumes"} />
      </div>
    </section>
  );
};

export default Resume;
