import React, { useState } from "react";
import axios from 'axios'
import jwtdecode from 'jwt-decode'
export function Addmessage(props) {
    const [messagetext, setMess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        var decoded = jwtdecode(token);
        console.log(decoded.user.id);
        let item = { guests_id:decoded.user.id, messagetext }
        const headers = {
            'authorization': token,
          };
        axios.post("http://localhost:4000/message", item,{headers})
            .then(function (response) {
                // handle success

                console.log(response);
                window.location.reload();
                alert(response.data.mess)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }
    return (
        <div  className="auth-form-container">
            <h2>add message</h2>
            <form className="message-form" onSubmit={handleSubmit}>
                <label htmlFor="write">write</label>
                <input value={messagetext} onChange={(e) => setMess(e.target.value)} type="text" id="messagetext" className='messtext' name="messagetext"/>
                <br />
                <button type="submit">Add message</button>
            </form>
        </div>
    )
}
