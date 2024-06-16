import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import List from "../components/channel/List";
import { getAccessToken } from "../utils/getDate";
import Cove from "../components/Cove";

const Invoices = () => {
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
              >
                Main channel{" "}
              </Link>
            </List>
            <List>
              <Link>2fa channel </Link>
            </List>
            <List>
              <Link>letter and attachment channel </Link>
            </List>
            <List>
              <Link>custom jobs channel</Link>
            </List>
            <List>
              <Link>logs and account channel</Link>
            </List>
            <List>
              <Link>gift item channel </Link>
            </List>
            <List>
              <Link>visual eyes only channel </Link>
            </List>
          </ol>
        </div>
      </div>
    </Cove>
  );
};

export default Invoices;
