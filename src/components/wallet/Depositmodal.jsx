import React, { useEffect, useState } from "react";
import { MdAdminPanelSettings, MdClose } from "react-icons/md";
import { FaBitcoin, FaLitecoinSign } from "react-icons/fa6";
import { FaCheckCircle, FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deposit } from "../../features/walletSlice";
import Walletmodal from "./Walletmodal";

const paymentMethods = [
  { name: "Bitcoin", icon: <FaBitcoin />, id: "btc" },
  { name: "Ethereum", icon: <FaEthereum />, id: "eth" },
  { name: "Litecoin", icon: <FaLitecoinSign />, id: "ltc" },
  { name: "Admin", icon: <MdAdminPanelSettings />, id: "adm" },
];

const initialState = {
  amount: "",
  paymentMethod: "",
};

const Depositmodal = ({ closeDepositModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [successModal, setsuccessModal] = useState(false);

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
    console.log("Clicked");
    dispatch(deposit(formData));
    console.log(formData);
  };

  useEffect(() => {
    let timeout;
    if (depositSuccess) {
      console.log("deposit successful!");
      setsuccessModal(true);
      setTimeout(() => {
        setsuccessModal(false);
        timeout = 3000;
        window.location.reload();
      }, timeout);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [depositSuccess, dispatch]);

  return (
    <div className="w-full h-screen fixed flex items-center justify-center top-0 left-0 bg-white bg-opacity-50">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 w-full lg:w-[370px] lg:mx-auto shadow rounded-xl p-6 m-4 lg:ml-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="flex items-center gap-1">
            Deposit
            {formData.paymentMethod && (
              <span className="ml-2">
                {paymentMethods.find(
                  (pmt) =>
                    pmt.name.toLowerCase() ===
                    formData.paymentMethod.toLowerCase()
                )?.icon || <span>No icon found</span>}
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
          {formData.paymentMethod && (
            <small className="p-2 bg-gray-200 text-gray-600 rounded-sm">
              {formData.paymentMethod === "Bitcoin"
                ? "Minimum: $50"
                : formData.paymentMethod === "Ethereum"
                ? "Minimum: $20"
                : formData.paymentMethod === "Litecoin"
                ? "Minimum: $30"
                : formData.paymentMethod === "Admin"
                ? "Minimum: $0"
                : "Select a payment method"}
            </small>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="paymentMethod" className="font-semibold">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="outline-none border placeholder:text-xs placeholder:font-thin p-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <option value="">Choose Payment Method</option>
              {paymentMethods.map((pmt) => (
                <option key={pmt.id} value={pmt.name}>
                  {pmt.name}
                </option>
              ))}
            </select>
          </div>
          {formData.paymentMethod !== "Admin" ||
            (formData.paymentMethod !== undefined && (
              <small className="p-2 bg-red-200 text-red-600 rounded-sm">
                Payment method not available.
              </small>
            ))}
          <div>
            <button
              type="submit"
              // disabled={formData.paymentMethod !== "Admin"}
              className="font-medium text-sm bg-red-600 text-white hover:bg-red-800 transition-all px-5 py-2 rounded-full w-full"
            >
              Deposit
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
