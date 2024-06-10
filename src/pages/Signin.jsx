import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { reset, signinUser } from "../features/signinSlice";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import Section from "../components/Section";

const Signin = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [showPass, setShowPass] = useState(false);

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

  const handlePass = () => {
    setShowPass((prev) => !prev);
  };

  useEffect(() => {
    document.title = "RH4OGS - Client login";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (accessToken) {
      console.log(accessToken);
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      timeout = setTimeout(() => {
        // dispatch(reset());
        navigate("/dashboard");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [accessToken, dispatch]);

  return (
    <Section>
      <div className="container px-3">
        <div className="flex justify-center -mx-3">
          <form
            action=""
            className="w-full xs:w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 px-3"
          >
            <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 w-full p-6 pt-5">
              <div className="flex items-center gap-2">
                <h3 className="capitalize text-xl font-black">sign in</h3>
                {/* <img src={logo} alt="" className="w-[30px]" /> */}
              </div>
              <div className="relative py-2">
                <Input
                  name={"username"}
                  value={form.username}
                  onChange={handleInput}
                  placeHolder={"username"}
                  type={"text"}
                />
                <FaUser className="absolute top-4 right-3 text-red-500" />
              </div>
              <div className="relative py-2">
                <Input
                  name={"password"}
                  value={form.password}
                  onChange={handleInput}
                  placeHolder={"password"}
                  type={showPass ? "text" : "password"}
                />
                <span onClick={handlePass} className="cursor-pointer">
                  {showPass ? (
                    <FaEye className="absolute top-4 right-3 text-red-500" />
                  ) : (
                    <FaEyeSlash className="absolute top-4 right-3 text-red-500" />
                  )}
                </span>
              </div>

              <span
                className={
                  error
                    ? "flex text-red-500 text-xs bg-red-500 bg-opacity-15 font-medium p-2 rounded-md capitalize"
                    : "hidden"
                }
              >
                {error}
              </span>
              <span
                className={
                  accessToken
                    ? "flex text-green-500 text-xs bg-green-500 bg-opacity-15 font-medium p-2 rounded-md capitalize"
                    : "hidden"
                }
              >
                Login successful.
              </span>
              <div className="pt-3">
                <button
                  onClick={handleSubmit}
                  className="inline-flex justify-center items-center font-medium transition-all text-sm px-5 py-2 gap-3 w-full rounded-md bg-red-600 text-white hover:bg-red-800"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>

              <p className="text-center font-normal text-xs pt-3">
                Don't have an account?{" "}
                <Link to={"/signup"} className="text-red-500">
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Signin;
