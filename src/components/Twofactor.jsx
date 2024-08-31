import React, { useEffect, useState } from "react";
import { GrShieldSecurity } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { buyProduct } from "../features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
// Link

const features = [
  "multiple layout and pages",
  "never red",
  "auto generate new link",
  "attachment",
  "pdf",
  "qr-code",
  "100% uptime",
];

const Twofactor = ({ title, monthlyPrice, dailyPrice, img }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { placeOrderError, placeOrderSuccess, placeOrderPending } = useSelector(
    (state) => state.order
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      item: title,
      price: monthlyPrice,
    };

    // console.log(data);
    dispatch(buyProduct(data));
  };

  useEffect(() => {
    if (placeOrderSuccess) {
      setSuccess(true);
    }
  }, [placeOrderSuccess]);

  useEffect(() => {
    if (placeOrderError) {
      setError(placeOrderError);
    }
  }, [placeOrderError]);

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = 6000;
      setTimeout(() => {
        setSuccess(false);
        navigate("/order");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [success]);

  return (
    <div className="border border-none dark:border-slate-200 flex flex-col gap-4 p-6 bg-white dark:bg-slate-950 mt-5 shadow-xl rounded-lg">
      <div className="flex gap-3 items-center">
        <img src={img} alt="" className="w-[30px]" />
        <h3 className="uppercase font-bold lg:text-md">{title}</h3>
      </div>
      <small className="text-sm text-slate-800 dark:text-slate-200">
        2fa links comes with these features:
      </small>
      <ul className="grid lg:grid-cols-2 gap-x-5 list-disc pl-2">
        {features.map((ft, index) => {
          return (
            <li
              className="capitalize p-1 text-slate-950 dark:text-slate-200 text-xs font-thin"
              key={index}
            >
              {ft}
            </li>
          );
        })}
      </ul>
      <div className="text-sm text-slate-800 dark:text-slate-200">
        <h5>price:</h5>
        <span className="flex items-center gap-6 ">
          <small>
            <span className="font-bold lg:text-lg">${monthlyPrice}</span>/month
          </small>
          <small>
            <span className="font-bold lg:text-lg">${dailyPrice}</span>/20days
          </small>
        </span>
      </div>
      <div className="flex flex-col gap-1 text-sm text-slate-800 dark:text-slate-200">
        <p> Link to video demo below</p>
        <Link className="underline" to={"https://t.me/rabbit2fa/64"}>
          watch video
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">{"order created successfully"}</p>
      )}
      <button
        onClick={handleSubmit}
        className="border-none bg-red-500 text-white rounded-3xl py-2.5 mt-4 capitalize"
      >
        {!placeOrderPending ? "order" : "wait..."}
      </button>
    </div>
  );
};

export default Twofactor;
