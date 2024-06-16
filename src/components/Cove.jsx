import React from "react";

const Cove = ({ children }) => {
  return (
    <section className="ml-0 font-medium text-xs lg:ml-[250px] flex-grow relative py-10  pt-20 sm:pt-16 lg:pt-2 min-h-screen ">
      {children}
    </section>
  );
};

export default Cove;
