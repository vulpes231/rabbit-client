import React, { useEffect, useState } from "react";
import { getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../features/orderSlice";
import { createTicket } from "../features/ticketSlice";

/* eslint-disable react/prop-types */
const ErrorModal = ({ error }) => {
  return <div className="absolute top-0 right-0 w-[150px]">{error}</div>;
};

const ConfirmTicket = ({ handleClick, loading, closeModal }) => {
  return (
    <div className="absolute top-[80px] right-[20px] w-[250px] bg-white p-6 shadow-lg rounded-xl font-thin dark:bg-slate-800 text-slate-950 dark:text-white flex flex-col gap-5">
      <h3>Are you sure you want to create a ticket?</h3>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 text-white px-4 py-1.5 rounded-2xl"
          onClick={handleClick}
        >
          {loading ? "Wait..." : "Confirm"}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1.5 rounded-2xl"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [orderId, setOrderId] = useState(null);
  const [ticketModal, setTicketModal] = useState(false);

  const { orders } = useSelector((state) => state.order);
  const { createTicketError, createTicketLoading, ticketCreated } = useSelector(
    (state) => state.ticket
  );

  const handleOptions = (e, ord) => {
    e.stopPropagation();
    const { value } = e.currentTarget;
    setSelectedOptions((prev) => ({
      ...prev,
      [ord._id]: value,
    }));
    setOrderId(ord._id);
  };

  const startNewTicket = (e) => {
    e.preventDefault();
    console.log("creating ticket");
    dispatch(createTicket(orderId));
  };

  const closeTicketModal = () => {
    setTicketModal(false);
  };

  useEffect(() => {
    if (selectedOptions[orderId] === "ticket") {
      setTicketModal(true);
    }
  }, [selectedOptions, orderId]);

  useEffect(() => {
    if (ticketCreated) {
      navigate(`/chat?orderId=${orderId}`);
      setSelectedOptions((prev) => ({
        ...prev,
        [orderId]: "",
      }));
      setTicketModal(false);
    }
  }, [ticketCreated, navigate, orderId]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      dispatch(getUserOrders());
    }
  }, [accessToken, navigate, dispatch]);

  // Filter orders to only show pending ones
  const pendingOrders = orders?.filter((ord) => ord.status === "pending");

  return (
    <section className="w-full lg:max-w-[1000px] mx-auto mt-10 ">
      <h3 className="text-xl font-bold mb-4 uppercase"> Pending Orders</h3>
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
          <tbody>
            {pendingOrders?.map((ord) => (
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
                    value={selectedOptions[ord._id] || ""}
                    name="option"
                    className="py-2 px-8 bg-green-500 text-white rounded-md"
                  >
                    <option value="">Select an option</option>
                    <option value="ticket">Open Ticket</option>
                    <option value="report">Report</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {createTicketError && <ErrorModal error={createTicketError} />}
        {ticketModal && (
          <ConfirmTicket
            handleClick={startNewTicket}
            loading={createTicketLoading}
            closeModal={closeTicketModal}
          />
        )}
      </div>
    </section>
  );
};

export default Orders;
