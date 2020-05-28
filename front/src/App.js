import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./scss/styles.scss"
import Login from "./components/Login"
import Base from "./components/Base"
import LandPage from "./components/LandPage"

function App() {
  const [user, setUser] = useState(null)
  const [loading,setLoading] = useState(true)
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let sock = new WebSocket("ws://localhost:3001");
    sock.onopen = () => {
      setSocket(sock);
      sock.onmessage = (msg) => {
        let data = JSON.parse(msg.data);
        console.log("message ", data);
      }
    }
    fetch("/auth/user")
      .then(res => res.json())
      .then(usr => {
        setUser(usr);
        setLoading(false);
      });
  }, [])
  
  return (
    loading?'':
    <Router>
      <Switch>
        <Route path="/platform">
          {user ? <Base user={user} socket={socket} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/platform" /> : <Login />}
        </Route>
        <Route path="/">
          <LandPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
