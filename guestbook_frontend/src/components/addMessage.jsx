import React, { useState } from "react";
import axios from "axios";
import jwtdecode from "jwt-decode";
import { Alert } from "reactstrap"
// import 'bootstrap/dist/css/bootstrap.min.css';

export function Addmessage(props) {
  const [messagetext, setMess] = useState("");
  const [alerts, setAlert] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    var decoded = jwtdecode(token);
    console.log(decoded.user.id);
    let item = { guests_id: decoded.user.id, messagetext };
    const headers = {
      authorization: token,
    };
    axios
      .post("http://localhost:4000/message", item, { headers })
      .then(function (response) {
        // handle success

        console.log(response);
        // alert(response.data.mess);
        setAlert(response.data.mess)
        props.parentCallback('A')
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="auth-form-container">
     <Alert color="success">
                {alerts}
            </Alert>
      <h2>add message</h2>
      <form className="message-form" onSubmit={handleSubmit}>
        <label htmlFor="write">write</label>
        <input
          value={messagetext}
          onChange={(e) => setMess(e.target.value)}
          type="text"
          id="messagetext"
          className="messtext"
          name="messagetext"
        />
        <br />
        <button type="submit">Add message</button>
      </form>
    </div>
  );
}
