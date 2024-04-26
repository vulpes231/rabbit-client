import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, reset } from "../features/signupSlice";

const Signup = () => {
  const initialState = {
    member: "",
    pass: "",
    mail: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);

  const { loading, error, success } = useSelector((state) => state.signup);

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
    dispatch(signupUser(form));
  };

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        dispatch(reset());
        navigate("/signin");
      }, 3000);
    }
    () => clearTimeout(timeout);
  }, [success, dispatch]);

  return (
    <section className="bg-[#333] h-screen flex items-center justify-center p-2">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-6 md:p-10 w-full shadow-xl items-center lg:w-[500px] mx-auto">
        <h3 className="capitalize text-3xl font-black">create account</h3>
        <img src={logo} alt="" className="w-[60px]" />
        <form action="" className="flex flex-col gap-4 w-full">
          <Input
            name={"member"}
            value={form.member}
            onChange={handleInput}
            placeHolder={"username"}
            type={"text"}
          />
          <Input
            name={"mail"}
            value={form.mail}
            onChange={handleInput}
            placeHolder={"email"}
            type={"email"}
          />
          <Input
            name={"pass"}
            value={form.pass}
            onChange={handleInput}
            placeHolder={"pass"}
            type={"password"}
          />
          <span className={error ? "flex text-red-500 font-bold" : "hidden"}>
            {error}
          </span>
          <span
            className={success ? "flex text-green-500 font-bold" : "hidden"}
          >
            Account created successfully.
          </span>
          <button
            className="bg-red-500 text-white font-bold py-3 cursor-pointer"
            onClick={handleSubmit}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
          <p className="text-center font-light text-sm ">
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
