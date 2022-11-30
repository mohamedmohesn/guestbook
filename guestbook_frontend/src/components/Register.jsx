import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fullname) {
      errors.fullname = "fullname is required!";
    } else if (values.fullname.length < 4) {
      errors.fullname = "fullname must be more than 4 characters";
    }

    if (!values.phone) {
      errors.phone = "phone is required!";
    } else if (values.phone.length < 9) {
      errors.phone = "phone must be more than 9 characters";
    } else if (values.phone.length > 15) {
      errors.phone = "phone cannot exceed more than 15 characters";
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    setFormErrors(validate({ email, fullname, phone, password }));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let item = { email, fullname, phone, password };

      axios
        .post("http://localhost:4000/signup", item)
        .then(function (response) {
          // handle success
          console.log(response.headers);
          console.log(response.data.token);
          localStorage.setItem("token", "Bearer " + response.data.token);
          // window.location = "/Message";
          navigate("/Message");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setErr(error.response.data);
        });
    }
  }, [formErrors]);
  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
          />
          <p>{formErrors.email}</p>
          <label htmlFor="name">Full name</label>
          <input
            value={fullname}
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
            type="text"
          />
          <p>{formErrors.fullname}</p>
          <label htmlFor="phone">phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            id="phone"
            name="phone"
          />
          <p>{formErrors.phone}</p>
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
        </form>
        <div className="alert">
          <span></span>
          <strong>{err}</strong>
        </div>
      </div>
    </div>
  );
};
