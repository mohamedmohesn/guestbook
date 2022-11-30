import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [err, setErr] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(validate({ email, password }));

    console.log(email);
    let item = { email, password };

    axios
      .post("http://localhost:4000/login", item)
      .then(function (response) {
        // handle success
        localStorage.setItem("token", "Bearer " + response.data.token);
        navigate("/Message");
        // window.location = "/Message";
      })
      .catch(function (error) {
        // handle error
        console.log(error.response.data);
        setErr(error.response.data);
      });
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
          />
          <p>{formErrors.email}</p>
          <label htmlFor="password">password</label>
          <input
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
          <p>{formErrors.password}</p>
          <button type="submit">Log In</button>
          <div className="alert">
            <span></span>
            <strong>{err}</strong>
          </div>
        </form>
      </div>
    </div>
  );
};
