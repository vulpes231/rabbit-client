import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
import ProductTable from "../components/ProductTable";
const Server = ({ toggle }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <div
      className={
        toggle
          ? "ml-[60%] md:ml-[40%]"
          : "ml-0 lg:ml-[250px] flex-grow overflow-hidden"
      }
    >
      <div className="w-full space-y-5 min-h-screen ">
        <ProductTable productName={"rdp"} />
        {/* <div className="overflow-x-scroll lg:overflow-hidden bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="px-2 py-10 text-center font-bold text-lg">
            <h4>Choose a location close to you have better latency</h4>
          </div>
          <table className="min-w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 capitalize whitespace-nowrap">
            <thead>
              <tr className="cursor-pointer">
                <th className="border border-gray-300 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  location
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  ram
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  os
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  access
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  price/month
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  availability
                </th>
                <th className="border border-gray-300 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-6 py-4 whitespace-no-wrap">
                  france
                </td>
                <td className="border border-gray-300 px-6 py-4 whitespace-no-wrap">
                  2GB
                </td>
                <td className="border border-gray-300 px-6 py-4 whitespace-no-wrap  ">
                  <span className="flex items-center gap-0.5">
                    <FaWindows /> windows 22
                  </span>
                </td>
                <td className="border border-gray-300 px-6 py-4 whitespace-no-wrap">
                  admin
                </td>
                <td className="border border-gray-300 px-6 py-4 whitespace-no-wrap">
                  $30.00
                </td>
                <td className="border border-gray-300 px-6 py-4 whitespace-no-wrap">
                  <span className="bg-green-500 bg-opacity-20 text-green-500 p-2 rounded-2xl font-bold">
                    in stock
                  </span>
                </td>
                <td className="border border-gray-300 px-6 py-4 whitespace-no-wrap">
                  <button
                    onClick={handleRowClick}
                    data-category="rdp"
                    data-location="france"
                    data-ram="2GB"
                    data-os="windows 22"
                    data-access="admin"
                    data-price="$30.00"
                    data-availability="in stock"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    buy
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        {/* <Construction /> */}
      </div>
    </div>
  );
};

export default Server;
