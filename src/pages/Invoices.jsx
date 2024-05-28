import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Content from "../components/invoice/Content";
import { Link, useNavigate } from "react-router-dom";
import List from "../components/channel/List";

const Invoices = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.signin);
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <section className="min-h-screen w-full bg-slate-700 bg-opacity-30 rounded-xl p-6">
      <div className="w-full">
        <span>
          <h3 className="uppercase font-semibold text-xl text-center pt-10">
            channels
          </h3>
        </span>
        <ol className="flex flex-col gap-6 list-disc font-thin text-slate-400 mt-5 px-10 capitalize">
          <List>
            <Link to={"https://rabbithole4ogs.com/channel/main/messages.html"}>
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
    </section>
  );
};

export default Invoices;
