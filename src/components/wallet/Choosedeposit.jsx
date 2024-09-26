import React, { useEffect, useState } from "react";
import Manualdeposit from "./Manualdeposit";
import Autodeposit from "./Autodeposit";

/* eslint-disable react/prop-types */
const Choosedeposit = ({ closeDepositModal }) => {
  const [selectedOption, setSelectedOption] = useState({ method: "" });
  const [depositMethod, setDepositMethod] = useState("");

  const handleSelected = (e) => {
    const { value } = e.target;
    setSelectedOption({ method: value });
  };

  useEffect(() => {
    if (
      selectedOption.method === "cryptoManual" ||
      selectedOption.method === "cryptoAuto"
    ) {
      setDepositMethod(selectedOption.method);
    } else {
      setDepositMethod("");
    }
  }, [selectedOption]);

  return (
    <div className="w-full h-screen fixed flex items-center justify-center top-0 left-0 bg-white bg-opacity-50">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 w-full sm:w-[370px] sm:mx-auto shadow rounded-xl p-6 m-4 flex flex-col gap-4">
        <div>
          <h3>Choose deposit method</h3>
          <select
            onChange={handleSelected}
            name="method"
            value={selectedOption.method}
            className="bg-transparent w-full border p-2"
          >
            <option value="">select method</option>
            <option value="cryptoManual">cryptocurrency (Manual)</option>
            <option value="cryptoAuto">cryptocurrency (Auto)</option>
          </select>
        </div>
      </div>
      {depositMethod === "cryptoManual" && (
        <Manualdeposit closeDepositModal={closeDepositModal} />
      )}
      {depositMethod === "cryptoAuto" && (
        <Autodeposit closeDepositModal={closeDepositModal} />
      )}
    </div>
  );
};

export default Choosedeposit;
