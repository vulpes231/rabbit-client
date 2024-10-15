import React from "react";

/* eslint-disable react/prop-types */
const Section = ({ children }) => {
  return (
    <section
      className="relative py-10 my-auto"
      style={{ scrollMarginTop: "var(--topbar-height, 69px)" }}
    >
      {children}
    </section>
  );
};

export default Section;
