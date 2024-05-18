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
            <th>Order ID</th>
            <th>Value</th>
            <th>Item</th>
            <th>Status</th>
            <th>Date</th>
          </thead>
          <tbody>
            <tr>
              <td>123456</td>
              <td>$10</td>
              <td>Gamadyne Sender</td>
              <td>paid</td>
              <td>May 17, 2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
