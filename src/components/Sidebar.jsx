import React, { useEffect } from "react";
import Sidelink from "./Sidelink";
import { MdArchive, MdSend } from "react-icons/md";
import {
  GrAddCircle,
  GrCatalog,
  GrCloudSoftware,
  GrHome,
  GrMail,
  GrResume,
  GrSend,
  GrServerCluster,
  GrServices,
  GrUserAdmin,
} from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { HiMail, HiOutlineDocumentText } from "react-icons/hi";
import {
  FaCamera,
  FaDev,
  FaLeanpub,
  FaMoneyBillTransfer,
  FaRaspberryPi,
  FaShareNodes,
  FaSignature,
} from "react-icons/fa6";
import { getAccessToken } from "../constants";
import { getProducts } from "../features/dashSlice";

// const categories = [z
//   "resume",
//   "sender",
//   "leads",
//   "rdp",
//   "attachment",
//   "social",
//   "office",
//   "smtp",
//   "financial",
//   "drainer",
//   "video",
//   "redirect",
//   "malware",
//   "cookie",
//   "extractor",
//   "bank",
//   "developer",
//   "paid",
//   "updated",
// ];

const Sidebar = ({
  toggle,
  handleLinks,
  activeLink,
  resetClick,
  handleLogout,
}) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const accessToken = getAccessToken();

  const categories = [
    ...new Set(products?.products?.map((prd) => prd.category)),
  ];

  useEffect(() => {
    if (accessToken) {
      dispatch(getProducts());
    }
  }, [accessToken]);

  return (
    <aside
      className={
        toggle
          ? "fixed h-full w-[60%] md:w-[40%] top-[100px] sm:top-[100px] left-0 z-30 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-5 md:hidden overflow-y-auto"
          : "hidden lg:flex fixed h-full w-[250px] top-[58px] left-0 z-30 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-5 overflow-y-auto max-h-[calc(100vh-58px)]"
      }
    >
      <div className="px-4 gap-2 flex flex-col h-full mt-20 sm:mt-16 lg:mt-0 ">
        <span
          onClick={() => {
            handleLinks("dash");
            resetClick();
          }}
        >
          <Sidelink title={"dash"} icon={<GrHome />} />
        </span>

        <span className="flex flex-col gap-2">
          {categories?.map((category, index) => (
            <Sidelink
              active={activeLink === category}
              key={index}
              icon={getIconForCategory(category)}
              title={
                category.includes("social")
                  ? "social media"
                  : category.includes("extractor")
                  ? "extractor + sorter"
                  : category.includes("sender")
                  ? "email senders"
                  : category.includes("redirect")
                  ? "redirect tools"
                  : category.includes("financial")
                  ? "financial services"
                  : category.includes("attachment")
                  ? "offline attachment "
                  : category.includes("office")
                  ? "office logs"
                  : category.includes("developer")
                  ? "developer services"
                  : category.includes("drainer")
                  ? "drainer (crypt)"
                  : category.includes("video")
                  ? "deep fake video tool"
                  : category
              }
              onClick={() => {
                handleLinks(category);
                resetClick();
              }}
            />
          ))}
        </span>
      </div>
    </aside>
  );
};

const getIconForCategory = (category) => {
  switch (category.toLowerCase()) {
    case "financial":
      return <GrServices />;
    case "developer":
      return <FaDev />;
    case "cookie":
      return <FaSignature />;
    case "bank":
      return <FaMoneyBillTransfer />;
    case "video":
      return <FaCamera />;
    case "malware":
      return <FaRaspberryPi />;
    case "office":
      return <GrCatalog />;
    case "sender":
      return <GrSend />;
    case "resume":
      return <GrResume />;
    case "drainer":
      return <MdArchive />;
    case "social":
      return <GrAddCircle />;
    case "redirect":
      return <GrCloudSoftware />;
    case "extractor":
      return <MdSend />;
    case "rdp":
      return <GrServerCluster />;
    case "2fa":
      return <GrUserAdmin />;
    case "tutorial":
      return <FaLeanpub />;
    case "attachment":
      return <HiOutlineDocumentText />;
    case "leads":
      return <HiMail />;
    case "smtp":
      return <FaShareNodes />;
    default:
      return null;
  }
};

export default Sidebar;
