import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAccessToken } from "../constants";
import TabContainer from "./TabContainer";
import { useDispatch, useSelector } from "react-redux";
import { buyProduct } from "../features/orderSlice";

const Server = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { placeOrderError, placeOrderSuccess, placeOrderPending } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  const Holder = ({ children }) => {
    return <div className="flex flex-col gap-1">{children}</div>;
  };

  const Label = ({ htmlFor, children }) => {
    return (
      <label className="capitalize" htmlFor={htmlFor}>
        {children}
      </label>
    );
  };

  const rdps = [
    { id: 1, price: 30, ram: 4, access: "user" },
    { id: 2, price: 40, ram: 6, access: "user" },
    { id: 3, price: 50, ram: 8, access: "user" },
    { id: 5, price: 50, ram: 4, access: "admin" },
    { id: 6, price: 80, ram: 8, access: "admin" },
  ];

  const [currentRdp, setCurrentRdp] = useState(null);
  const [selection, setSelection] = useState({
    ram: "",
    access: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      item: `${selection.access} ${selection.ram}gb ${selection.location} RDP`,
      price: currentRdp?.price,
    };
    console.log(data);
    dispatch(buyProduct(data));
  };

  useEffect(() => {
    if (selection.access && selection.ram) {
      const rdpInfo = rdps.find(
        (rdp) =>
          rdp.access === selection.access &&
          rdp.ram === parseInt(selection.ram, 10)
      );
      setCurrentRdp(rdpInfo || null);
    }
  }, [selection]);

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
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize">
        RDPs
      </h3>
      <div className="flex items-center justify-center">
        <h3 className="py-5 text-center w-[55%] ">
          Microsoft azure RDPs, with best IP reputation and uptime. Comes with
          management panel, PORT 25 open, Clean IP, works well with admin
          connector.
        </h3>
      </div>

      <div className="flex items-center justify-center py-10 ">
        <form
          onSubmit={handleSubmit}
          className="lg:w-[380px] flex flex-col gap-4 dark:bg-slate-950 bg-white p-6 rounded-xl shadow-xl"
        >
          <h3>Order now</h3>
          <Holder>
            <Label htmlFor="ram">RAM</Label>
            <select
              className="bg-transparent border p-2"
              name="ram"
              value={selection.ram}
              onChange={handleChange}
              id="ram"
            >
              <option value="">Choose RAM</option>
              <option value="4">4GB</option>
              <option value="6">6GB</option>
              <option value="8">8GB</option>
            </select>
          </Holder>
          <Holder>
            <Label htmlFor="access">Access Level</Label>
            <select
              className="bg-transparent border p-2"
              name="access"
              value={selection.access}
              onChange={handleChange}
              id="access"
            >
              <option value="">Choose Access Level</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </Holder>
          <Holder>
            <Label htmlFor="price">Price</Label>
            <input
              type="text"
              id="price"
              className="bg-transparent border outline-none p-2"
              value={currentRdp?.price || ""}
              readOnly
            />
          </Holder>
          <Holder>
            <Label htmlFor="country">Location</Label>
            <select
              className="bg-transparent border p-2"
              name="location"
              value={selection.location}
              onChange={handleChange}
            >
              <option value="">Select location</option>
              <option value="usa">USA</option>
              <option value="canada">CANADA</option>
              <option value="europe">EUROPE</option>
              <option value="germany">GERMANY</option>
            </select>
          </Holder>
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500">{"order created successfully"}</p>
          )}
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white rounded-3xl py-2.5 capitalize"
            type="submit"
          >
            {!placeOrderPending ? "order" : "wait..."}
          </button>
        </form>
      </div>
    </TabContainer>
  );
};

export default Server;
