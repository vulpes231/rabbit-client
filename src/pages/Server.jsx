import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import TabContainer from "./TabContainer";

const Server = ({ handleLinks }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

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

  const Input = () => {
    return <input className="bg-transparent border p-2" type="text" />;
  };

  const rdps = [
    { id: 1, price: 30, ram: 4, access: "user" },
    { id: 2, price: 40, ram: 6, access: "user" },
    { id: 3, price: 50, ram: 8, access: "user" },
    { id: 5, price: 50, ram: 4, access: "admin" },
    { id: 6, price: 80, ram: 8, access: "admin" },
  ];

  const [currentRdp, setCurrentRdp] = useState(null);
  const [selection, setSelection] = useState({ ram: "", access: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log(selection);
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

  return (
    <TabContainer>
      <div className="flex items-center justify-center">
        <h3 className="py-5 text-center w-[55%] capitalize">
          microsoft azure rdp, 4g ram, same power as a corei7 laptop, renewable
          monthly subscription.
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
          <button
            className="bg-red-500 text-white rounded-3xl py-2.5"
            type="submit"
          >
            Purchase
          </button>
        </form>
      </div>
    </TabContainer>
  );
};

export default Server;
