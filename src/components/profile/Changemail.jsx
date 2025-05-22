import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdSecurity, MdEmail, MdLock } from "react-icons/md";
import Container from "./Container";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { editUser, resetEditUser } from "../../features/userSlice";
import Customerror from "../Customerror";

const Changemail = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email: "",
    newPass: "",
    password: "",
    password2: "",
  });

  const { editUserError, editUserLoading, userEdited } = useSelector(
    (state) => state.user
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUser = (e) => {
    e.preventDefault();
    if (!form.password) {
      setError("Current password is required");
      return;
    }
    if (form.newPass !== form.password2) {
      setError("Passwords do not match");
      return;
    }
    dispatch(editUser(form));
  };

  useEffect(() => {
    if (editUserError) setError(editUserError);
    if (userEdited) setError("Profile updated successfully");

    const timer = setTimeout(() => {
      dispatch(resetEditUser());
      setError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [editUserError, userEdited, dispatch]);

  return (
    <Container
      icon={<MdSecurity className="text-red-500" />}
      title="Security Settings"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="space-y-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdEmail className="text-slate-400" />
            </div>
            <input
              type="email"
              placeholder={user?.email}
              value={form.email}
              onChange={handleInput}
              name="email"
              className="w-full pl-10 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdLock className="text-slate-400" />
            </div>
            <input
              type="password"
              placeholder="Enter current password"
              value={form.password}
              onChange={handleInput}
              name="password"
              className="w-full pl-10 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-500 dark:text-slate-400">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLock className="text-slate-400" />
              </div>
              <input
                type="password"
                placeholder="Enter new password"
                value={form.newPass}
                onChange={handleInput}
                name="newPass"
                className="w-full pl-10 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-500 dark:text-slate-400">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLock className="text-slate-400" />
              </div>
              <input
                type="password"
                placeholder="Confirm new password"
                value={form.password2}
                onChange={handleInput}
                name="password2"
                className="w-full pl-10 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <Customerror error={error} setError={setError} />

        <Button
          title={
            !editUserLoading ? "Update Security Settings" : "Processing..."
          }
          handleClick={updateUser}
          className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-md"
        />
      </motion.div>
    </Container>
  );
};

export default Changemail;
