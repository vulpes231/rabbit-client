import React, { useEffect } from "react";
import { getAccessToken } from "../utils/getDate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TabContainer from "./TabContainer";
import { getUserOrders } from "../features/orderSlice";

const Orders = ({ toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { orders } = useSelector((state) => state.order);

  // console.log(orders);

  const myOrders = orders?.map((ord) => {
    return (
      <tr
        className="border-b dark:border-slate-700 text-xs font-thin capitalize"
        key={ord._id}
      >
        <td className="py-2 px-4">01/07/2024</td>
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
          <button className="py-2 px-8 bg-green-500 text-white  rounded-md">
            Show Info
          </button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      dispatch(getUserOrders());
    }
  }, [accessToken, navigate]);

  return (
    <TabContainer toggle={toggle}>
      <h3 className="text-xl font-bold mb-4 uppercase">My orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-900 dark:text-slate-200 text-xs font-medium">
          <thead>
            <tr className="bg-red-500 dark:bg-slate-80 text-white uppercase">
              <th className="text-left py-2 px-4">Date</th>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Price</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>{myOrders}</tbody>
        </table>
      </div>
    </TabContainer>
  );
};

export default Orders;
