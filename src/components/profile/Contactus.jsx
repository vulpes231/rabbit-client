import React from "react";
import { MdContactPage } from "react-icons/md";
import Container from "./Container";
import { Link } from "react-router-dom";

const styles = {
  link: "px-4 py-2.5 bg-red-500 text-white rounded-3xl cursor-pointer capitalize text-xs font-medium whitespace-nowrap",
};

const Contactus = () => {
  return (
    <Container icon={<MdContactPage />} title={"contact us:"}>
      <span className="flex justify-between items-center">
        <Link className={styles.link} to={"/tickets"}>
          Open a ticket
        </Link>
        <Link className={styles.link}>Send an email</Link>
      </span>
    </Container>
  );
};

export default Contactus;
