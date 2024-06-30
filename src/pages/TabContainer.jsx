import React from "react";

const TabContainer = ({ children, toggle }) => {
  return (
    <div
      className={
        toggle
          ? "ml-[60%] md:ml-[40%] w-full overflow-x-scroll"
          : "ml-0 lg:ml-[250px] flex-grow overflow-x-scroll w-full"
      }
    >
      {children}
    </div>
  );
};

export default TabContainer;
