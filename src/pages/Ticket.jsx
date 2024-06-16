import React, { useEffect } from "react";
import Content from "../components/ticket/Content";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Ticket = ({ toggle }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <div
      className={
        toggle
          ? "ml-[60%] md:ml-[40%]"
          : "ml-0 lg:ml-[250px] flex-grow overflow-hidden"
      }
    >
      <div className="w-full space-y-5 min-h-screen">
        <span>
          <h3 className="uppercase font-semibold text-lg text-center pt-10">
            tickets
          </h3>
        </span>
        <Content />
      </div>
    </div>
  );
};

export default Ticket;
