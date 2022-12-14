import React, { useState, useEffect } from "react";
import axios from "axios";
import { Addmessage } from "./addMessage";
import jwtdecode from "jwt-decode";

export function Message(props) {
  const [mess, setRequest] = useState([]);
  const [messagetext, setMess] = useState("");
  const [display, setDis] = useState("");
  const [alerts, setAlerts] = useState("");

  const token = localStorage.getItem("token");
  var decoded = jwtdecode(token);
  // console.log(decoded.user.id);
  const headers = {
    authorization: token,
  };

  const url = `http://localhost:4000/message/${decoded.user.id}`;
  useEffect(() => {
    axios
      .get(url, { headers })
      .then((response) => {
        setRequest(response.data[0]);
        console.log(display);
        // console.log(mess , response.data);
        setDis(0);
      })
      .catch(() => {
        setRequest();
      });
  }, [display]);

  const deleteMessage = async (id, e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/message/${id}`, { headers })
      .then((response) => {
        console.log(response.data.mess);
        setDis("D" + id);
        setAlerts(response.data.mess);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // setRequest()
      });
  };

  const editMessage = async (id, e) => {
    e.preventDefault();
    let item = { messagetext };
    axios
      .put(`http://localhost:4000/message/edit/${id}`, item, { headers })
      .then((response) => {
        console.log(response.data);
        // window.location.reload();
        setAlerts(`${response.data.mess}`);
        setDis("E" + id);
        console.log(display);
        // setRequest(response.data)
      })
      .catch((err) => {
        console.log(err);
        // setRequest()
      });
  };
  const handleCallback = (childData) => {
    setDis({ name: childData });
  };
  return (
    <div className="App">
      <div className="alert info">
        <span></span>
        <strong>{alerts}</strong>
      </div>
      <Addmessage parentCallback={handleCallback} />
      <div className="auth-form-container">
        <h2>Messages</h2>

        {Array.isArray(mess) ? (
          mess.map((user, index) => (
            <div key={index} className="auth-form-container">
              <h2 className="del">{user.messagetext}</h2>
              <br />
              <br />
              <button
                className="del"
                onClick={(e) => deleteMessage(user.id, e)}
                type="submit"
              >
                delete
              </button>

              <input
                value={messagetext}
                onChange={(e) => setMess(e.target.value)}
                type="text"
                id="messagetext"
                className="messtext"
                name="messagetext"
              />
              <button type="submit" onClick={(e) => editMessage(user.id, e)}>
                Edit message
              </button>
            </div>
          ))
        ) : (
          <h2>please enter message</h2>
        )}
      </div>
    </div>
  );
}
