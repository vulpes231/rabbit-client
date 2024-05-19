import React from "react";

const Content = () => {
  return (
    <div className=" w-full mt-5">
      <div className="flex flex-col items-center md:justify-between md:flex-row">
        <span className="flex items-center gap-2 capitalize ">
          show
          <select name="" id="" className="text-[#333]">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          entries
        </span>
        <span className="flex items-center gap-2 ">
          <label htmlFor="">Search</label>
          <input type="text" />
        </span>
      </div>
      <div className="overflow-x-scroll w-full">
        <table className="min-w-full divide-y divide-gray-200 mt-10">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                123456
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                $10
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Gamadyne Sender
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                paid
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                May 17, 2024
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
