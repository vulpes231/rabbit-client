import React from "react";
import { MdAttachEmail } from "react-icons/md";
import { CgUser } from "react-icons/cg";
import Container from "./Container";
import Button from "./Button";
const Changemail = () => {
  return (
    <Container icon={<MdAttachEmail />} title={"change mail:"}>
      <span className="flex items-center gap-1 relative">
        <span className="absolute top-2 right-2">
          <CgUser />
        </span>
        <input
          type="text"
          placeholder="email@email.com"
          className="w-full px-2 py-1 bg-transparent border outline-none placeholder:font-extralight placeholder:text-xs"
        />
      </span>
      <span className="flex items-center gap-1 relative">
        <span className="absolute top-2 right-2">
          <CgUser />
        </span>
        <input
          type="password"
          placeholder="password"
          className="w-full px-2 py-1 bg-transparent border outline-none placeholder:font-extralight placeholder:text-xs"
        />
      </span>
      <Button title={"update"} />
    </Container>
  );
};

export default Changemail;
