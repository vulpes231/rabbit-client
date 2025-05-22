import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, resetSignup } from "../features/signupSlice";
import { FaEye, FaEyeSlash, FaArrowRight, FaUserPlus } from "react-icons/fa";
import Section from "../components/Section";
import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} from "../utils/validation";
import { motion } from "framer-motion";
import Successmodal from "../components/Successmodal";
import ErrorModal from "../components/Errormodal";

const Signup = () => {
  const initialState = {
    member: "",
    pass: "",
    mail: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const { loading, signupError, success } = useSelector(
    (state) => state.signup
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePass = () => {
    setShowPass((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate username
    if (!isValidUsername(form.member)) {
      setError("Username must be at least 4 characters long.");
      return;
    }

    // Validate email
    if (!isValidEmail(form.mail)) {
      setError("Please enter a valid email address.");
      return; // Prevent further execution
    }

    // Validate password
    if (!isValidPassword(form.pass)) {
      setError("Password must be at least 8 characters long.");
      return; // Prevent further execution
    }

    dispatch(signupUser(form));
  };

  useEffect(() => {
    document.title = "RH4OGS - Create account";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        dispatch(resetSignup());
        navigate("/signin");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (signupError) {
      setError(signupError);
    }
  }, [signupError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(resetSignup());
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch, navigate]);

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
              {/* Form Header with Gradient */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaUserPlus className="text-white" />
                  Create Account
                </h3>
                <p className="text-red-100 text-sm mt-1">
                  Join our community today
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* Username Field */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative group"
                >
                  <Input
                    name="member"
                    value={form.member}
                    onChange={handleInput}
                    placeHolder="Username"
                    type="text"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-slate-800 transition-all"
                  />
                  {/* <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 group-hover:text-red-500 transition-colors" /> */}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative group"
                >
                  <Input
                    name="mail"
                    value={form.mail}
                    onChange={handleInput}
                    placeHolder="Email"
                    type="email"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-slate-800 transition-all"
                  />
                  {/* <MdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 group-hover:text-red-500 transition-colors" /> */}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative group"
                >
                  <Input
                    name="pass"
                    value={form.pass}
                    onChange={handleInput}
                    placeHolder="Password"
                    type={showPass ? "text" : "password"}
                    className="pl-10 pr-10 py-3 w-full rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-slate-800 transition-all"
                  />
                  {/* <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 group-hover:text-red-500 transition-colors" /> */}
                  <motion.button
                    type="button"
                    onClick={handlePass}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </motion.button>
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Sign Up <FaArrowRight className="text-sm" />
                    </>
                  )}
                </motion.button>

                {/* Login Link */}
                <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-2">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                  >
                    Login now
                  </Link>
                </p>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
      {error && <ErrorModal error={error} />}
      {success && <Successmodal success={"Account created successfully."} />}
    </Section>
  );
};

export default Signup;
