import React, { useEffect } from "react";
import Content from "../components/ticket/Content";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Ticket = () => {
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
        <span>
          <h3 className="uppercase font-semibold text-lg text-center pt-10">
            tickets
          </h3>
        </span>
        <Content />
      </div>
    </Cove>
  );
};

export default Ticket;
