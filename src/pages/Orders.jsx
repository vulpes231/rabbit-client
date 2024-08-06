import React, { useEffect, useState } from "react";
import { getAccessToken } from "../utils/getDate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TabContainer from "./TabContainer";
import { getUserOrders } from "../features/orderSlice";

const Orders = ({ toggle, handleLinks }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const [selectedOptions, setSelectedOptions] = useState({
    option: "",
  });
  const [orderData, setOrderData] = useState({});

  const handleOptions = (e, ord) => {
    e.stopPropagation();
    const { name, value } = e.target;
    // set the selected option and associated order ID
    setSelectedOptions({
      option: value,
      orderId: ord._id, // Capture the order ID for context
    });
  };

  const { orders } = useSelector((state) => state.order);

  const myOrders = orders?.map((ord) => {
    return (
      <tr
        className="border-b dark:border-slate-700 text-xs font-thin capitalize"
        key={ord._id}
      >
        <td className="py-2 px-4">{ord._id}</td>
        <td className="py-2 px-4">{ord.item}</td>
        <td className="py-2 px-4">${ord.price}</td>
        <td className="py-2 px-4 ">
          <small
            className={`py-2 px-4 rounded-lg capitalize ${
              ord.status === "completed"
                ? "text-green-500 bg-green-50"
                : ord.status === "failed"
                ? "text-red-500 bg-red-50"
                : "text-yellow-500 bg-yellow-50"
            }`}
          >
            {ord.status}
          </small>
        </td>
        <td className="py-2 px-4">
          <select
            onChange={(e) => handleOptions(e, ord)}
            value={
              selectedOptions.orderId === ord._id ? selectedOptions.option : ""
            }
            name="option"
            className="py-2 px-8 bg-green-500 text-white rounded-md"
          >
            <option value="">Select an option</option>
            <option value="ticket">Open Ticket</option>
            <option value="report">Report</option>
          </select>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    if (selectedOptions.option.includes("ticket")) {
      setSelectedOptions("");
      navigate("/chat");
    }
  }, [selectedOptions, orderData]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      dispatch(getUserOrders());
    }
  }, [accessToken, navigate]);

  return (
    <section className="w-full lg:max-w-[1000px] mx-auto ">
      <h3 className="text-xl font-bold mb-4 uppercase">My Orders</h3>
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white dark:bg-slate-900 dark:text-slate-200 text-xs font-medium">
          <thead>
            <tr className="bg-red-500 dark:bg-slate-80 text-white uppercase">
              <th className="text-left py-2 px-4">Order ID</th>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Price</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>{myOrders}</tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
