import React from "react";

const Statistic = ({ detail, value, title }) => {
  return (
    <div className="flex justify-between">
      <p className="lg:text-md lg:font-extralight ">
        <span className="font-bold ">
          {detail}:{" "}
          <span
            className={
              value > 0
                ? "bg-green-500 p-1 rounded-full"
                : "bg-red-500 p-1 rounded-full"
            }
          >
            {" "}
            {value}
          </span>
        </span>
      </p>
      <span className="text-xs lg:font-semibold bg-white text-black rounded-md p-1 cursor-pointer hover:text-red-500 ">
        {title}
      </span>
    </div>
  );
};

export default Statistic;
