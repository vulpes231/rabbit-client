import React from "react";
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
import { useSelector } from "react-redux";
import { HiOutlineDocumentText } from "react-icons/hi";
// Logo;
const Sidebar = ({
  toggle,
  handleLinks,
  activeLink,
  resetClick,
  handleLogout,
}) => {
  const { products } = useSelector((state) => state.products);

  const categories = [
    ...new Set(products?.products?.map((prd) => prd.category)),
  ];

  return (
    <aside
      className={
        toggle
          ? "fixed h-full w-[60%] md:w-[40%] top-[130px] sm:top-[100px] left-0 z-30 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-5 md:hidden"
          : "hidden lg:flex fixed h-full w-[250px] top-[58px] left-0 z-30 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-5"
      }
    >
      <div className="p-4 flex flex-col gap-4 h-full">
        <span
          onClick={() => {
            handleLinks("dash");
            resetClick();
          }}
        >
          <Sidelink title={"dash"} icon={<GrHome />} />
        </span>
        {categories?.map((category, index) => (
          <Sidelink
            active={activeLink === category}
            key={index}
            icon={getIconForCategory(category)}
            title={category}
            onClick={() => {
              handleLinks(category);
              resetClick();
            }}
          />
        ))}
        {/* <Logout resetClick={resetClick} handleLogout={handleLogout} /> */}
      </div>
    </aside>
  );
};

// Function to select appropriate icon based on category
const getIconForCategory = (category) => {
  switch (category.toLowerCase()) {
    case "service":
      return <GrServices />;
    case "office365":
      return <GrCatalog />;
    case "sender":
      return <GrSend />;
    case "resume":
      return <GrResume />;
    case "drainer":
      return <MdArchive />;
    case "social account":
      return <GrAddCircle />;
    case "link":
      return <GrCloudSoftware />;
    case "custom":
      return <MdSend />;
    case "rdp":
      return <GrServerCluster />;
    case "2fa":
      return <GrUserAdmin />;
    // case "office365":
    //   return <GrMail />;
    case "attachment":
      return <HiOutlineDocumentText />;
    default:
      return null; // You can add more cases as needed
  }
};

export default Sidebar;
