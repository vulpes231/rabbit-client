import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Signup = () => {
  const initialState = {
    username: "",
    password: "",
    email: "",
  };

  const [form, setForm] = useState(initialState);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section className="bg-[#333] h-screen flex items-center justify-center p-2">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-6 md:p-10 w-full shadow-xl items-center lg:w-[500px] mx-auto">
        <h3 className="capitalize text-3xl font-black">create account</h3>
        <img src={logo} alt="" className="w-[60px]" />
        <form action="" className="flex flex-col gap-4 w-full">
          <Input
            name={"username"}
            value={form.username}
            onChange={handleInput}
            placeHolder={"username"}
            type={"text"}
          />
          <Input
            name={"email"}
            value={form.email}
            onChange={handleInput}
            placeHolder={"email"}
            type={"text"}
          />
          <Input
            name={"password"}
            value={form.password}
            onChange={handleInput}
            placeHolder={"password"}
            type={"text"}
          />

          <button
            className="bg-red-500 text-white font-bold py-3 cursor-pointer"
            onClick={handleSubmit}
          >
            Sign up
          </button>
          <p className="text-center font-light ">
            Already have an account?{" "}
            <Link className="text-red-500" to={"/signin"}>
              Login now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
