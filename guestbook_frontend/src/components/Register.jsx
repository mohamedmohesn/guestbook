import React, { useState } from "react";
import axios from 'axios'


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [phone, setPhone] = useState('');
    const [fullname, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);

        let item = { email, fullname, phone, password }

        axios.post("http://localhost:4000/signup",item)
            .then(function (response) {
                
                // handle success
                console.log(response.headers);
                console.log(response.data.token);
                localStorage.setItem("token","Bearer "+response.data.token)
                window.location = "/Message";
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            

    }

    return (<div className="App">
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                <label htmlFor="name">Full name</label>
                <input value={fullname} onChange={(e) => setName(e.target.value)} name="name" id="name" type="text" />
                <label htmlFor="phone">phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" id="phone" name="phone" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            </div>
        </div>
    )
}