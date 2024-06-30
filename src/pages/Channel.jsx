import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import List from "../components/channel/List";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Invoices = ({ toggle }) => {
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
        <div className="">
          <span>
            <h3 className="uppercase font-semibold text-xl text-center pt-10">
              channels
            </h3>
          </span>
          <ol className="flex flex-col gap-6 list-disc font-thin mt-5 px-10 capitalize">
            <List>
              <Link
                to={"https://rabbithole4ogs.com/channel/main/messages.html"}
                target="_blank"
              >
                main channel
              </Link>
            </List>
            <List>
              <Link to={"https://rabbithole4ogs.com/channel/2fa/messages.html"}>
                2fa channel
              </Link>
            </List>
            <List>
              <Link
                to={"https://rabbithole4ogs.com/channel/letters/messages.html"}
              >
                letter and attachment channel{" "}
              </Link>
            </List>
            <List>
              <Link>custom jobs channel</Link>
            </List>
            <List>
              <Link
                to={"https://rabbithole4ogs.com/channel/logs/messages.html"}
              >
                logs and account channel
              </Link>
            </List>
            <List>
              <Link
                to={"https://rabbithole4ogs.com/channel/gift/messages.html"}
              >
                gift item channel{" "}
              </Link>
            </List>
            <List>
              <Link>visual eyes only channel </Link>
            </List>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
