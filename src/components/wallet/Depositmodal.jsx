import React, { useEffect, useState } from "react";
import { MdAdminPanelSettings, MdClose } from "react-icons/md";
import { FaBitcoin, FaLitecoinSign } from "react-icons/fa6";
import { FaCheckCircle, FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deposit } from "../../features/walletSlice";
import Walletmodal from "./Walletmodal";

const paymentMethods = [
  { currency: "bitcoin", icon: <FaBitcoin />, id: "btc", network: ["btc"] },
  {
    currency: "ethereum",
    icon: <FaEthereum />,
    id: "eth",
    network: ["erc20", "base mainnet", "arbitrum one", "bsc(bep20)"],
  },
  {
    currency: "tether",
    icon: <FaLitecoinSign />,
    id: "usdt",
    network: ["erc20", "trc20", "bsc(bep20)"],
  },
  { currency: "admin", icon: <MdAdminPanelSettings />, id: "adm", network: [] },
];

const initialState = {
  currency: "",
  network: "",
  amount: "",
};

const Depositmodal = ({ closeDepositModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [successModal, setsuccessModal] = useState(false);
  const [error, setError] = useState(false);

  const { depositError, depositSuccess, depositLoading } = useSelector(
    (state) => state.wallet
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

    if (formData.currency === "admin" && parseFloat(formData.amount) < 100) {
      setError("Minimum deposit is $100");
      return;
    }

    const dataToSend = {
      currency: formData.currency.toLowerCase(),
      amount: parseFloat(formData.amount),
      network: formData.network || "",
    };

    // dispatch(deposit(dataToSend));
    console.log(dataToSend);
  };

  useEffect(() => {
    let timeout;
    if (depositSuccess) {
      console.log("deposit successful!");
      setsuccessModal(true);
      setTimeout(() => {
        setsuccessModal(false);
        timeout = 5000;
        window.location.reload();
      }, timeout);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [depositSuccess, dispatch]);

  useEffect(() => {
    if (depositError) {
      setError(depositError);
    }
  }, [depositError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 3000;
      setTimeout(() => {
        setError(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const selectedPaymentMethod = paymentMethods.find(
    (pmt) => pmt.id === formData.currency
  );

  return (
    <div className="w-full h-screen fixed flex items-center justify-center top-0 left-0 bg-white bg-opacity-50">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 w-full sm:w-[370px] sm:mx-auto shadow rounded-xl p-6 m-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="flex items-center gap-1">
            Deposit
            {formData.currency && (
              <span className="ml-2">
                {selectedPaymentMethod?.icon || <span>No icon found</span>}
              </span>
            )}
          </h4>
          <MdClose onClick={closeDepositModal} className="cursor-pointer" />
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 capitalize"
        >
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
          {formData.currency && (
            <small className="p-2 bg-gray-200 text-gray-600 rounded-sm">
              {formData.currency === "bitcoin"
                ? "Minimum: $50"
                : formData.currency === "ethereum"
                ? "Minimum: $20"
                : formData.currency === "tether"
                ? "Minimum: $30"
                : formData.currency === "admin"
                ? "Minimum: $100"
                : "Select a payment method"}
            </small>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="currency" className="font-semibold">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
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
          {formData.currency === "admin" && (
            <small className="p-2 bg-red-200 text-red-600 rounded-sm">
              Payment method not available.
            </small>
          )}

          {depositSuccess && (
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
              {depositLoading ? "Processing..." : "Deposit"}
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

export default Depositmodal;
