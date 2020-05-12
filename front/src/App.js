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
import Habit from "./components/Habit"

function App() {
  const [user, setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    fetch("/auth/user")
      .then(res => res.json())
      .then(usr => {
        setUser(usr);
        setLoading(false);
      })
  }, [])
  
  return (
    loading?'':
    <Router>
      <Switch>
        <Route path="/platform">
          {user ? <Base user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/platform" /> : <Login />}
        </Route>
        <Route path="/habits">
          <Habit
            title="ToMeditate"
            userEmail="jm.contreras10@uniandes.edu.co" />
        </Route>
        <Route path="/">
          <LandPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
