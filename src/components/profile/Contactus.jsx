import React from "react";
import { MdContactPage } from "react-icons/md";
import Button from "./Button";
import Container from "./Container";

const Contactus = () => {
  return (
    <Container icon={<MdContactPage />} title={"contact us:"}>
      <span className="flex justify-between items-center">
        <Button title={"Open a ticket"} />
        <Button title={"Send an email"} />
      </span>
    </Container>
  );
};

export default Contactus;
