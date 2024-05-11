import React from "react";
import { construct } from "../assets";

const Construction = () => {
  return (
    <div className="flex items-center justify-center w-full mt-[180px] flex-col gap-6">
      <img src={construct} alt="" className="w-[350px] rounded-full" />
      <p className="font-thin">
        This page is under contruction 🚧. Please try again later.🙏
      </p>
    </div>
  );
};

export default Construction;
