import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

const Signin = () => {
  const initialState = {
    username: "",
    password: "",
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
    <section>
      <h3>sign in</h3>
      <img src="" alt="" />
      <form action="">
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

        <button onClick={handleSubmit}>Sign in</button>
        <p>
          Don't have an account? <Link to={"/signup"}>Sign up now</Link>
        </p>
      </form>
    </section>
  );
};

export default Signin;
