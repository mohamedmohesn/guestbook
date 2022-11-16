import React, { useState } from "react";
import axios from 'axios'

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [err, setErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        let item = { email, password }
        
        axios.post("http://localhost:4000/login", item)
            .then(function (response) {
                // handle success
                localStorage.setItem("token","Bearer "+response.data.token)
                window.location = "/Message";
            })
            .catch(function (error) {
                // handle error
                console.log(error.response.data);
                setErr(error.response.data)
            })
    }

    return (
        <div className="App">
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                <button type="submit">Log In</button>
                <p>{err}</p>

            </form>
            </div>
        </div>
    )
}