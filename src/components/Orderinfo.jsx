import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompletedOrderDetails } from "../features/orderSlice";
import { getAccessToken } from "../constants";

/* eslint-disable react/prop-types */
const Orderinfo = ({ order, onClose }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const { orderDetails } = useSelector((state) => state.order);

  const accessToken = getAccessToken();

  //   console.log(orderDetails);

  const orderInformation = orderDetails?.userCompletedOrders?.find(
    (ord) => ord.orderId === order?._id
  );

  //   console.log(orderInformation);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getCompletedOrderDetails());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopy = () => {
    const textToCopy = orderInformation?.detail; // Adjust this to the correct property
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          //   alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = 2000;
      setTimeout(() => {
        setCopied(false);
      }, timeout);
    }

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <section className="w-full h-screen bg-black bg-opacity-40 top-0 left-0 fixed flex items-center justify-center">
      <div
        ref={ref}
        className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 p-6 border flex flex-col gap-4"
      >
        <div className="text-xs">
          <p>Order ID: {order?._id}</p>
          <p>Item: {order?.item}</p>
          <p>Price: {order?.price}</p>
          <p>Status: {order?.status}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold uppercase">order details</h3>
          <span className="dark:bg-slate-700 bg-slate-200  p-6">
            {orderInformation?.detail}
          </span>
        </div>

        <div className="flex gap-2 items-center capitalize">
          <button className="p-2 bg-red-500 text-white" onClick={handleCopy}>
            {!copied ? "Copy" : "Copied!"}
          </button>
          <button className="p-2 bg-red-500 text-white" onClick={onClose}>
            close
          </button>
        </div>
      </div>
    </section>
  );
};

export default Orderinfo;
