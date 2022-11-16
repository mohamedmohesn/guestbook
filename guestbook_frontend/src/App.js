import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Route, Routes,BrowserRouter as Router ,Link } from "react-router-dom";
import './App.css';
import './index.css';
import { Login } from "./components/login";
import { Register } from "./components/Register";
import { Message } from "./components/message";
import { Logout } from "./components/logout";

function App() {

  const [user, setUser] = useState("");

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

  return (
   
    <Router>
      <nav className="index">
           {!user && (
                <React.Fragment>
                    <Link to="/login">
                        <button>
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button >
                            Signup
                        </button>
                    </Link>
                </React.Fragment>
            )}
            {user && (
                <React.Fragment>
                    <h4 >{user.name}</h4>
                    <Link to="/logout">
                        <button>
                            Logout
                        </button>
                    </Link>
                </React.Fragment>
            )} 
      </nav>
       <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" element={<Register/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/Message" element={<Message/>} />
        </Routes>
     </Router>
      
  );
}

export default App;
