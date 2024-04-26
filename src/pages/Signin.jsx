import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../features/signinSlice";

const Signin = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);

  const { accessToken, loading, error } = useSelector((state) => state.signin);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    dispatch(signinUser(form));
  };

  useEffect(() => {
    let timeout;
    if (accessToken) {
      console.log(accessToken);
      timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
    () => clearTimeout(timeout);
  }, [accessToken, dispatch]);

  return (
    <section className="bg-[#333] h-screen flex items-center justify-center p-2">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-6 md:p-10 w-full shadow-xl items-center lg:w-[500px] mx-auto">
        <h3 className="capitalize text-3xl font-black">sign in</h3>
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
            name={"password"}
            value={form.password}
            onChange={handleInput}
            placeHolder={"password"}
            type={"text"}
          />
          <span className={error ? "flex text-red-500 font-bold" : "hidden"}>
            {error}
          </span>
          <span
            className={accessToken ? "flex text-green-500 font-bold" : "hidden"}
          >
            Login successful.
          </span>
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white font-bold py-3 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="text-center font-light text-sm ">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-500">
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signin;
