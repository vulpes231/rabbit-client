import React from "react";

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
