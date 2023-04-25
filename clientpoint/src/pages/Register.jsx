import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const initial = {
    email: "",
    username: "",
    password: "",
  };
  const [inputs, SetInputs] = useState(initial);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    SetInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (
      inputs.password === "" ||
      inputs.username === "" ||
      inputs.email === ""
    ) {
      setErr("wrong registrations inputs");
      toast.error("wrong registrations inputs")
      return false;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/register`,
        inputs,{withCredentials:true}
      );
      if (data) {
        toast.success(`Hi ${inputs.username}, sign in to continue`)
        navigate("/login");
      } else {
        setErr("Registration failed");
        toast.error("failed to create Account")
      }
    } catch (error) {
      setErr(error.message);
      toast.error(error.message)
    }
  };

  return (
    <div>
      <div className="auth">
        <h1>Register</h1>
        <form action="">
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            required
            onChange={handleChange}
          />
          <button onClick={registerUser}>Login</button>
          {err && <p>{err}</p>}
          <span>
            {" "}
            have an accout <Link to="/login">Login</Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
