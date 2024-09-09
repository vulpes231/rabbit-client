import React, { useEffect, useState } from "react";
import { MdAttachEmail } from "react-icons/md";
import { CgPassword, CgUser } from "react-icons/cg";
import Container from "./Container";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import Customerror from "../Customerror";
import { editUser, resetEditUser } from "../../features/userSlice";

const styles = {
  input:
    "w-full px-2 py-1 bg-transparent border outline-none placeholder:font-extralight placeholder:text-xs",
};

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

  useEffect(() => {
    if (editUserError) {
      setError(editUserError);
    }
  }, [editUserError]);

  const updateUser = (e) => {
    e.preventDefault();

    console.log(form.email);

    if (!form.password) {
      setError("Current password required!");
      return;
    }

    if (form.newPass !== form.password2) {
      setError("Password does not match!");
      return;
    }
    console.log(form);
    dispatch(editUser(form));
  };

  useEffect(() => {
    let timeout;
    if (editUserError || userEdited) {
      timeout = 3000;
      setTimeout(() => {
        dispatch(resetEditUser());
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [editUserError, userEdited]);

  return (
    <Container icon={<MdAttachEmail />} title={"change mail:"}>
      <span className="flex items-center gap-1 relative">
        <span className="absolute top-2 right-2">
          <CgUser />
        </span>
        <input
          type="text"
          placeholder={user?.email}
          value={form.email}
          onChange={handleInput}
          name="email"
          className={styles.input}
          autoComplete="off"
        />
      </span>
      <span className="flex items-center gap-1 relative">
        <span className="absolute top-2 right-2">
          <CgPassword />
        </span>
        <input
          type="password"
          placeholder="Current password"
          value={form.password}
          onChange={handleInput}
          name="password"
          className={styles.input}
        />
      </span>
      <span className="flex items-center gap-1 relative">
        <span className="absolute top-2 right-2">
          <CgPassword />
        </span>
        <input
          type="password"
          placeholder="New password"
          value={form.newPass}
          onChange={handleInput}
          name="newPass"
          className={styles.input}
        />
      </span>
      <span className="flex items-center gap-1 relative">
        <span className="absolute top-2 right-2">
          <CgPassword />
        </span>
        <input
          type="password"
          placeholder="Confirm password"
          value={form.password2}
          onChange={handleInput}
          name="password2"
          className={styles.input}
        />
      </span>
      <Customerror error={error} setError={setError} />
      <Button
        title={!editUserLoading ? "update" : "wait..."}
        handleClick={updateUser}
      />
    </Container>
  );
};

export default Changemail;
