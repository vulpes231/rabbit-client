import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import { useSelector } from "react-redux";
import TabContainer from "./TabContainer";
import { GrShieldSecurity } from "react-icons/gr";

const Bypass = ({ handleLinks }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { products } = useSelector((state) => state.products);

  // Filter products that have the category "Bypass"
  const myBypass = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "2fa"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  const features = [
    "multiple layout and pages",
    "never red",
    "auto generate new link",
    "attachment",
    "pdf",
    "qr-code",
    "100% uptime",
  ];

  return (
    <TabContainer>
      <div className="flex flex-col gap-8">
        <div className="border w-full lg:w-[390px] flex flex-col gap-4 p-6 bg-white dark:bg-slate-950 text-xs font-medium mt-5 shadow-xl rounded-lg">
          <div className="flex gap-1 items-center">
            <GrShieldSecurity className="text-xl" />
            <h3 className="uppercase font-bold lg:text-xl">2fa link</h3>
          </div>
          <p className="text-sm">2fa links comes with these features:</p>
          <ul className="grid grid-cols-2 gap-2 list-disc pl-2">
            {features.map((ft, index) => {
              return (
                <li
                  className="capitalize p-1 text-slate-950 dark:text-white font-normal"
                  key={index}
                >
                  {ft}
                </li>
              );
            })}
          </ul>
          <div>
            <h5>price:</h5>
            <span className="flex items-center gap-6 ">
              <small>
                <span className="font-bold lg:text-lg">$400</span>/month
              </small>
              <small>
                <span className="font-bold lg:text-lg">$350</span>/20days
              </small>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <p> Link to video demo below</p>
            <Link className="underline" to={"https://t.me/rabbit2fa/64"}>
              watch video
            </Link>
          </div>
          <button className="border-none bg-red-500 text-white rounded-3xl py-2.5 mt-4">
            purchase
          </button>
        </div>
      </div>
      {/* <ProductTable data={myBypass} /> */}
    </TabContainer>
  );
};

export default Bypass;
