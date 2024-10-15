import React from "react";
import Product from "./Product";
import { products } from "../constants";
// import Section from "./Section";
import { FaUserSecret } from "react-icons/fa6";
import { TbRouteAltRight } from "react-icons/tb";
import { LuMailSearch } from "react-icons/lu";
import { RiMailSendLine } from "react-icons/ri";
import { GoDependabot } from "react-icons/go";
import { SiReaddotcv } from "react-icons/si";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineServerStack } from "react-icons/hi2";
import { SiWalletconnect } from "react-icons/si";
import { MdOutlineAttachEmail } from "react-icons/md";
import { PiAndroidLogoLight } from "react-icons/pi";

const Products = () => {
  const myProducts = products.map((prod) => {
    const icon =
      prod.id === "2fa" ? (
        <FaUserSecret className="text-rose-500" />
      ) : prod.id === "redirect" ? (
        <TbRouteAltRight className="text-pink-500" />
      ) : prod.id === "mail" ? (
        <LuMailSearch className="text-amber-500" />
      ) : prod.id === "smtp" ? (
        <RiMailSendLine className="text-red-500" />
      ) : prod.id === "chatbot" ? (
        <GoDependabot className="text-orange-500" />
      ) : prod.id === "resume" ? (
        <SiReaddotcv className="text-lime-500" />
      ) : prod.id === "social" ? (
        <VscAccount className="text-zinc-500" />
      ) : prod.id === "web3" ? (
        <PiAndroidLogoLight className="text-blue-500" />
      ) : prod.id === "rdp" ? (
        <HiOutlineServerStack className="text-purple-500" />
      ) : prod.id === "scanner" ? (
        <SiWalletconnect className="text-yellow-500" />
      ) : prod.id === "attach" ? (
        <MdOutlineAttachEmail className="text-green-500" />
      ) : null;
    return (
      <Product
        icon={icon}
        key={prod.id}
        title={prod.title}
        content={prod.tools.map((av, index) => (
          <li className="font-semibold text-sm uppercase ml-8" key={index}>
            {av || "custom"}
          </li>
        ))}
      />
    );
  });
  return (
    <section className=" py-20">
      <div className="container px-3 font-[Montserrat]">
        <h3 className="text-xl lg:text-4xl font-black text-center uppercase my-10">
          our services include
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts}
        </div>
      </div>
    </section>
  );
};

export default Products;
