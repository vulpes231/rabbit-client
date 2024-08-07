import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, reset } from "../features/signupSlice";
import { FaEye, FaUser, FaEyeSlash } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import Section from "../components/Section";
import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} from "../utils/validation";

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
  const [showError, setShowError] = useState(false);

  const { loading, error, success } = useSelector((state) => state.signup);

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
      setShowError(
        "Username must be at least 4 characters long and can only contain alphabets and numbers."
      );
      return; // Prevent further execution
    }

    // Validate email
    if (!isValidEmail(form.mail)) {
      setShowError("Please enter a valid email address.");
      return; // Prevent further execution
    }

    // Validate password
    if (!isValidPassword(form.pass)) {
      setShowError(
        "Password must be at least 8 characters long and contain at least one uppercase letter and one digit."
      );
      return; // Prevent further execution
    }

    // Dispatch signupUser action
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
        dispatch(reset());
        navigate("/signin");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      setShowError(error);
    }
  }, [error]);

  return (
    <Section>
      <div className="container px-3">
        <div className="flex justify-center -mx-3">
          <form className="w-full xs:w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 px-3">
            <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 w-full p-6 pt-5">
              <div className="flex gap-2 items-center">
                <h3 className="capitalize text-xl font-black">
                  create account
                </h3>
              </div>
              <div className="relative py-2">
                <Input
                  name={"member"}
                  value={form.member}
                  onChange={handleInput}
                  placeHolder={"username"}
                  type={"text"}
                />
                <FaUser className="absolute top-[20px] text-xs  right-3 text-red-500" />
              </div>
              <div className="relative py-2">
                <Input
                  name={"mail"}
                  value={form.mail}
                  onChange={handleInput}
                  placeHolder={"email"}
                  type={"email"}
                />
                <MdMail className="absolute top-[20px] text-xs right-3 text-red-500" />
              </div>
              <div className="relative py-2">
                <Input
                  name={"pass"}
                  value={form.pass}
                  onChange={handleInput}
                  placeHolder={"password"}
                  type={showPass ? "text" : "password"}
                />
                <span onClick={handlePass} className="cursor-pointer text-xs">
                  {showPass ? (
                    <FaEye className="absolute top-[20px] right-3 text-red-500" />
                  ) : (
                    <FaEyeSlash className="absolute top-[20px] right-3 text-red-500" />
                  )}
                </span>
              </div>
              <span
                className={
                  showError
                    ? "flex text-red-500 font-normal text-xs bg-red-200 py-2 px-4 rounded-xl"
                    : "hidden"
                }
              >
                {showError}
              </span>
              <span
                className={
                  success ? "flex text-green-500 font-bold py-2" : "hidden"
                }
              >
                Account created successfully.
              </span>
              <div className="pt-3">
                <button
                  className="inline-flex justify-center items-center font-medium transition-all text-sm px-5 py-2 gap-3 w-full rounded-md bg-red-600 text-white hover:bg-red-800"
                  onClick={handleSubmit}
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>
              </div>
              <p className="text-center font-light text-sm pt-3">
                Already have an account?{" "}
                <Link className="text-red-500" to={"/signin"}>
                  Login now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Signup;
