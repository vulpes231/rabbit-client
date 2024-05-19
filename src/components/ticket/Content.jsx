import React from "react";

const Content = () => {
  return (
    <div className=" w-full  mt-5">
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
      <div className="overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Add your rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
