import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";

const Resume = ({ toggle, handleLinks }) => {
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
    <TabContainer toggle={toggle}>
      <ProductTable title={"buy"} data={myResume} />
    </TabContainer>
  );
};

export default Resume;
