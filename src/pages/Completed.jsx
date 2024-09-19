import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import { getUserOrders } from "../features/orderSlice";

const Completed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);
  const [completedOrders, setCompletedOrders] = useState([]);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      dispatch(getUserOrders());
    }
  }, [accessToken, navigate, dispatch]);

  useEffect(() => {
    // Filter out completed orders when orders change
    if (orders) {
      const filteredOrders = orders.filter((ord) => ord.status === "completed");
      setCompletedOrders(filteredOrders);
    }
  }, [orders]);

  return (
    <section className="font-[Montserrat]">
      <div className="w-full min-h-screen lg:max-w-[1000px] mx-auto mt-28 sm:mt-16 lg:mt-0 flex flex-col">
        <h3 className="uppercase font-semibold text-lg py-5">
          completed orders
        </h3>
        <div className="overflow-auto dark:bg-slate-950 bg-white">
          <table className="min-w-full">
            <thead className="bg-red-500 capitalize text-left">
              <tr className="">
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Item</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.map((ord) => (
                <tr
                  className="border-b dark:border-slate-700 text-xs font-thin capitalize "
                  key={ord._id}
                >
                  <td className="py-4 px-4">{ord._id}</td>
                  <td className="py-4 px-4">{ord.item}</td>
                  <td className="py-4 px-4">${ord.price}</td>
                  <td className="py-4 px-4">
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
                  <td className="p-4">
                    <span className="underline">view details</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Completed;
