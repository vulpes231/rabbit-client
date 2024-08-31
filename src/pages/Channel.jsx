import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "../components/channel/List";
import { getAccessToken } from "../constants";
import { MdAttachEmail, MdHome, MdLockPerson } from "react-icons/md";
import { FaEyeLowVision, FaUserGear } from "react-icons/fa6";
import { RiArchiveStackFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";

const Channel = ({ toggle }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  useEffect(() => {
    document.title = "RH4OGS - Channels";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);
  return (
    <section>
      <div className="w-full min-h-screen lg:max-w-[1000px] mx-auto">
        <h3 className="uppercase font-semibold text-xl text-center pt-10">
          channels
        </h3>

        <div className=" p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
          <List
            icon={<MdHome />}
            channelName={"main"}
            link={"https://rabbithole4ogs.com/channel/main/messages.html"}
          />
          <List
            icon={<FaUserGear />}
            channelName={"2FA"}
            link={"https://rabbithole4ogs.com/channel/2fa/messages.html"}
          />
          <List
            icon={<MdAttachEmail />}
            channelName={"letter & attachment"}
            link={"https://rabbithole4ogs.com/channel/letters/messages.html"}
          />
          <List icon={<MdLockPerson />} channelName={"custom job "} link={""} />
          <List
            icon={<RiArchiveStackFill />}
            channelName={"log & account "}
            link={"https://rabbithole4ogs.com/channel/logs/messages.html"}
          />
          <List
            icon={<FaGift />}
            channelName={"gift item "}
            link={"https://rabbithole4ogs.com/channel/gift/messages.html"}
          />
          <List
            icon={<FaEyeLowVision />}
            channelName={"visual eyes only "}
            link={""}
          />
        </div>
      </div>
    </section>
  );
};

export default Channel;
