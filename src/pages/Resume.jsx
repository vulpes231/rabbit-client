import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Resume = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <Cove>
      <div className="container px-3">
        <ProductTable productName={"resumes"} />
      </div>
    </Cove>
  );
};

export default Resume;
