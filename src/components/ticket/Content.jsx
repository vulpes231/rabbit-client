import React from "react";

const Content = () => {
  return (
    <div className=" w-full p-4 mt-5">
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
      <div>
        <table>
          <thead>
            <th>Ticket ID</th>
            <th>Message</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
