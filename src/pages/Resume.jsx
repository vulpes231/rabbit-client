import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../constants";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Resume = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  // Filter products that have the category "Resume"
  const myResume = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "resume"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        Resumes
      </h3>
      <ProductTable data={myResume} />
    </TabContainer>
  );
};

export default Resume;
