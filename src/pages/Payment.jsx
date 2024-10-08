import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../constants";
import {
  getTransactionById,
  confirmPayment,
} from "../features/transactionSlice";

const Payment = () => {
  const { transactionId } = useParams();
  const dispatch = useDispatch();

  const accesstoken = getAccessToken();

  const { trnxDetail, markPaidLoading, markPaidError, markPaid } = useSelector(
    (state) => state.transaction
  );
  // console.log(trnxDetail);

  const [form, setForm] = useState({
    hash: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionId = trnxDetail?.transaction?._id;

    dispatch(confirmPayment(transactionId, form));
  };

  const copyAddress = () => {
    const address = trnxDetail?.transaction?.depositAddress;

    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          console.log("Address copied to clipboard!");
          alert("Copied address!");
        })
        .catch((err) => {
          console.error("Failed to copy address: ", err);
        });
    } else {
      console.warn("No address to copy.");
    }
  };

  useEffect(() => {
    if (markPaid) {
      window.location.href = "/wallet";
    }
  }, [markPaid]);

  useEffect(() => {
    if (accesstoken) {
      dispatch(getTransactionById(transactionId));
    }
  }, [accesstoken, dispatch, transactionId]);
  return (
    <div className="p-6 w-full">
      <div className="md:max-w-[600px] dark:bg-slate-950 bg-white md:mx-auto rounded-lg shadow-lg p-6 flex flex-col gap-4">
        <h4 className="text-xl font-semibold mb-4 text-center text-red-500">
          RHS4OG&apos;s Payment Invoice
        </h4>

        <div className="flex flex-col gap-3 capitalize">
          <small className="flex justify-between">
            <span className="font-semibold">Customer Email:</span>{" "}
            <span>{trnxDetail?.transaction?.userEmail}</span>
          </small>
          <small className="flex justify-between">
            <span className="font-semibold">Transaction Status:</span>{" "}
            <span
              className={`py-1.5 px-5 rounded-xl text-xs font-semibold ${
                trnxDetail?.transaction?.status === "pending"
                  ? "bg-red-100 text-red-500"
                  : "bg-green-100 text-green-500"
              }`}
            >
              {trnxDetail?.transaction?.status === "pending"
                ? "not paid"
                : "paid"}
            </span>
          </small>
          <small className="flex justify-between">
            <span className="font-semibold">Coin:</span>{" "}
            <span>{trnxDetail?.transaction?.currency}</span>
          </small>
          <small className="flex justify-between">
            <span className="font-semibold">Network:</span>{" "}
            <span>{trnxDetail?.transaction?.network}</span>
          </small>
          <small className="flex justify-between">
            <span className="font-semibold">Invoice Amount:</span>{" "}
            <span>{trnxDetail?.transaction?.amount} USD</span>
          </small>
        </div>
        <ul className="p-4 text-xs font-thin list-disc">
          <li>
            Make sure you select and send to the correct network, because we are
            not liable for any loss of funds in regards to the wrong network.
          </li>
          <li>Ensure you are sending the correct amount.</li>
          <li>
            Double-check the copied address before sending, as transactions
            cannot be reversed once completed.
          </li>
          <li>
            Be aware of any network fees that may apply, which can vary
            depending on the cryptocurrency and current network congestion.
          </li>
          <li>
            for faster confirmation please provide your transaction hash below
          </li>
        </ul>

        <div className=" my-3">
          <h5 className=" text-lg font-semibold text-center">
            Deposit {trnxDetail?.transaction?.amount} USD to{" "}
            {trnxDetail?.transaction?.depositAddress}
          </h5>
        </div>

        <div className="flex flex-col gap-2 ">
          <label className="text-sm font-medium capitalize" htmlFor="">
            Transaction hash (optional)
          </label>
          <input
            type="text"
            onChange={handleInput}
            value={form.hash}
            name="hash"
            placeholder="paste your transaction hash here"
            className="w-full p-2 outline-none focus:outline-red-500 border bg-transparent focus:border-none"
          />
        </div>

        <div className="flex flex-col md:flex-row  md:items-center md:justify-between gap-4">
          <button
            className="text-white py-2.5 px-6 bg-red-500 w-full uppercase text-sm font-medium"
            onClick={handleSubmit}
          >
            {!markPaidLoading ? " mark paid" : "Wait..."}
          </button>
          <button
            onClick={copyAddress}
            className="text-white py-2.5 px-6 bg-gray-500 w-full uppercase text-sm font-medium"
          >
            copy address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
