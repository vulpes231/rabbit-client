import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetLogin, signinUser } from "../features/signinSlice";
import { FaEye, FaEyeSlash, FaUser, FaArrowRight } from "react-icons/fa";
import Section from "../components/Section";
import Errormodal from "../components/Errormodal";
import Successmodal from "../components/Successmodal";

import { format } from "date-fns";

const Signin = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });

  const { accessToken, loading, loginError, user } = useSelector(
    (state) => state.signin
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in form) {
      if (form[key] === "") {
        setError(`${key.slice(0, 1).toUpperCase()}${key.slice(1)} required!`);
        return;
      }
    }
    dispatch(signinUser(form));
  };

  const handlePass = () => {
    setShowPass((prev) => !prev);
  };

  useEffect(() => {
    document.title = "RH4OGS - Signin";
  }, []);

  useEffect(() => {
    if (accessToken && user) {
      const lastLogin = format(new Date(), "dd/MMM/yyyy hh:mm a");
      try {
        sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        sessionStorage.setItem("lastLogin", JSON.stringify(lastLogin));
      } catch (error) {
        console.error("Failed to save access token:", error);
      }

      setTimeout(() => {
        dispatch(resetLogin());
        window.location.href = "/dashboard";
      }, 1000);
    }
  }, [accessToken, dispatch, navigate, user]);

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(resetLogin());
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  return (
    <Section>
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <motion.form
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaUser className="text-white" />
                  Sign In
                </h3>
                <p className="text-red-100 text-sm mt-1">
                  Access your account dashboard
                </p>
              </div>

              <div className="p-6 space-y-5">
                {/* Username Field */}
                <motion.div
                  animate={{
                    borderColor: isFocused.username ? "#ef4444" : "#e2e8f0",
                    boxShadow: isFocused.username
                      ? "0 0 0 3px rgba(239, 68, 68, 0.2)"
                      : "none",
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative border rounded-lg overflow-hidden dark:border-slate-700"
                >
                  <Input
                    name={"username"}
                    value={form.username}
                    onChange={handleInput}
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                    placeHolder={"Username"}
                    type={"text"}
                    className="pl-10 pr-4 py-3 w-full focus:outline-none dark:bg-slate-800 h-[38px]"
                  />
                  {/* <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" /> */}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  animate={{
                    borderColor: isFocused.password ? "#ef4444" : "#e2e8f0",
                    boxShadow: isFocused.password
                      ? "0 0 0 3px rgba(239, 68, 68, 0.2)"
                      : "none",
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative border rounded-lg overflow-hidden dark:border-slate-700"
                >
                  <Input
                    name={"password"}
                    value={form.password}
                    onChange={handleInput}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    placeHolder={"Password"}
                    type={showPass ? "text" : "password"}
                    className="px-20 py-3  w-full focus:outline-none dark:bg-slate-800 h-[38px]"
                  />
                  {/* <FaKey className="absolute left-1 text-slate-400 dark:text-slate-500" /> */}
                  <motion.span
                    onClick={handlePass}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </motion.span>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white transition-all shadow-md`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <FaArrowRight className="text-sm" />
                    </>
                  )}
                </motion.button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
      {error && <Errormodal error={error} />}
      {accessToken && <Successmodal success={"Login Successful."} />}
    </Section>
  );
};

export default Signin;
