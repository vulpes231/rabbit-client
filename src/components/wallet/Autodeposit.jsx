import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaBitcoin, FaLitecoinSign } from "react-icons/fa6";
import { FaCheckCircle, FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Walletmodal from "./Walletmodal";
import { autoDeposit, resetAutoDeposit } from "../../features/depositSlice";
// import { useNavigate } from "react-router-dom";

const paymentMethods = [
  { currency: "bitcoin", icon: <FaBitcoin />, id: "bitcoin", network: ["btc"] },
  {
    currency: "ethereum",
    icon: <FaEthereum />,
    id: "ethereum",
    network: ["erc20", "base mainnet", "arbitrum one", "bsc(bep20)"],
  },
  {
    currency: "tether",
    icon: <FaLitecoinSign />,
    id: "tether",
    network: ["erc20", "trc20"],
  },
];

const initialState = {
  coinName: "",
  network: "",
  amount: "",
};

/* eslint-disable react/prop-types */
const Autodeposit = ({ closeDepositModal }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [successModal, setsuccessModal] = useState(false);
  const [error, setError] = useState(false);

  const { autoDepositError, autoTrnxData, autoDepositLoading } = useSelector(
    (state) => state.deposit
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.coinName === "bitcoin" && parseFloat(formData.amount) < 10) {
      setError("Minimum deposit is $10");
      return;
    }
    if (formData.coinName === "tether" && parseFloat(formData.amount) < 10) {
      setError("Minimum deposit is $10");
      return;
    }
    if (formData.coinName === "ethereum" && parseFloat(formData.amount) < 10) {
      setError("Minimum deposit is $10");
      return;
    }

    const dataToSend = {
      coinName: formData.coinName.toLowerCase(),
      amount: parseFloat(formData.amount),
      network: formData.network || "",
    };

    dispatch(autoDeposit(dataToSend));
    // console.log(dataToSend);
  };

  useEffect(() => {
    if (autoTrnxData) {
      // setInvoiceData(autoTrnxData);
      closeDepositModal();
      dispatch(resetAutoDeposit());
      window.open(autoTrnxData.invoiceUrl.data.invoice_url, "_blank");
    }
  }, [autoTrnxData, dispatch, closeDepositModal]);

  useEffect(() => {
    if (autoDepositError) {
      setError(autoDepositError);
    }
  }, [autoDepositError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 4000;
      setTimeout(() => {
        setError(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const selectedPaymentMethod = paymentMethods.find(
    (pmt) => pmt.id === formData.coinName
  );

  return (
    <div className="w-full h-screen fixed flex items-center justify-center top-0 left-0 bg-white bg-opacity-50">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 w-full sm:w-[370px] sm:mx-auto shadow rounded-xl p-6 m-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="flex items-center capitalize font-bold text-lg gap-1 ">
            Deposit with
            <span>
              {formData.coinName && (
                <span className="flex items-center gap-2">
                  <span className="">{selectedPaymentMethod.currency}</span>
                  <span className="">{selectedPaymentMethod.icon}</span>
                </span>
              )}
            </span>
          </h4>
          <MdClose onClick={closeDepositModal} className="cursor-pointer" />
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 capitalize"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="currency" className="font-semibold">
              Currency
            </label>
            <select
              name="coinName"
              value={formData.coinName}
              onChange={handleChange}
              className="outline-none border placeholder:text-xs placeholder:font-thin p-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <option value="">Choose Payment Method</option>
              {paymentMethods.map((pmt, index) => (
                <option key={index} value={pmt.id}>
                  {pmt.currency}
                </option>
              ))}
            </select>
          </div>
          {selectedPaymentMethod && (
            <div className="flex flex-col gap-1">
              <label htmlFor="network" className="font-semibold">
                Network
              </label>
              <select
                name="network"
                value={formData.network}
                onChange={handleChange}
                className="outline-none border placeholder:text-xs placeholder:font-thin p-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
              >
                <option value="">Select Network</option>
                {selectedPaymentMethod.network.map((network, index) => (
                  <option key={index} value={network}>
                    {network}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="amount" className="font-semibold">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="$0.00"
              autoComplete="off"
              className="outline-none border placeholder:text-xs placeholder:font-thin p-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            />
          </div>
          {formData.coinName && (
            <small className="p-2 rounded-sm font-medium text-xs">
              {formData.coinName === "bitcoin"
                ? "Minimum: $10"
                : formData.coinName === "ethereum"
                ? "Minimum: $10"
                : formData.coinName === "tether"
                ? "Minimum: $10"
                : "Select a payment method"}
            </small>
          )}

          {autoTrnxData && (
            <small className="bg-yellow-200 text-yellow-500 p-2 rounded-xl">
              Deposit pending.
            </small>
          )}
          <div>
            {error && (
              <div className="text-red-500 py-2">
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              // disabled={formData.paymentMethod !== "Admin"}
              className="font-medium text-sm bg-red-600 text-white hover:bg-red-800 transition-all px-5 py-2 rounded-full w-full"
            >
              {autoDepositLoading ? "Wait..." : "Generate Address"}
            </button>
          </div>
        </form>
      </div>
      {successModal && (
        <Walletmodal title={"Deposit completed."} icon={<FaCheckCircle />} />
      )}
    </div>
  );
};

export default Autodeposit;
