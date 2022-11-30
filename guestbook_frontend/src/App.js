import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "./util/PrivateRoutes";
import "./App.css";
import "./index.css";
import { Login } from "./components/login";
import { Register } from "./components/Register";
import { Message } from "./components/message";

function App() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    // window.location = "/login";
    navigate("/login");
  };
  function getCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  console.log(user);
  return (
    <React.Fragment>
      <nav className="index">
        {!localStorage.getItem("token") && (
          <React.Fragment>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </React.Fragment>
        )}
        {localStorage.getItem("token") && (
          <React.Fragment>
            <button onClick={() => logout()}>Logout</button>
          </React.Fragment>
        )}
      </nav>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/Message" element={<Message />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
