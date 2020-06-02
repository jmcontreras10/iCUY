import { ToastProvider } from 'react-toast-notifications'
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [records, setRecords] = useState([]);
  const [pupils, setPupils] = useState(null);
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    fetch("/auth/user")
      .then(res => res.json())
      .then(async usr => {
        setUser(usr);
        if (usr) {
          let sock = new WebSocket(window.location.origin.replace(/^http/, 'ws'));
          sock.onopen = () => {
            setSocket(sock);
          }
          fetch(`/habits/filter?userEmail=${usr.email}`)
            .then(res => res.json())
            .then(hab => {
              setHabits(hab);
            });
          fetch(`/records/filter?userEmail=${usr.email}`)
            .then(res => res.json())
            .then(rec => {
              setRecords(rec);
            })
          if(usr.pupils){
            let pups={};
            let promises=[];
            usr.pupils.forEach((pup)=>{
              pups[pup]={}
              promises.push(fetch(`/habits/filter?userEmail=${pup}`)
              .then(res => res.json())
              .then(hab => {
                pups[pup].habits=hab;
              }));
              promises.push(fetch(`/records/filter?userEmail=${pup}`)
              .then(res => res.json())
              .then(recs => {
                let d = new Date();
                let actualDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
                let today = recs.filter(ele => ele.date === actualDate);
                pups[pup].records=today;
              }));
            });
            Promise.all(promises).then(()=>{
              setPupils(pups);
            });
          }
        }
        setLoading(false);
      });

  }, [])

  useEffect(() => {
    if (socket)
      socket.onmessage = (msg) => {
        let data = JSON.parse(msg.data);
        if (data.operationType === "delete") {
          switch (data.ns.coll) {
            case "users":
              if (data.documentKey._id === user._id) {
                window.location.reload()
              }
              break;
            case "habits":
              let habs = habits.filter(ele => ele._id !== data.documentKey._id);
              if (habs.length < habits.length) {
                setHabits(habs);
              }
              else{
                // let cambio = false;
                // let res = pupils.map(pup=>{
                //   let n = pup.filter(ele => ele._id !== data.documentKey._id)
                //   if (n.length < pup.length){
                //     cambio = true;
                //     return n;
                //   }
                //   return pup;
                // });
                // if(cambio)
                //   setPupils(res);
              }
              break;
            case "records":
              let recs = records.filter(ele => ele._id !== data.documentKey._id );
              if(recs.length<records.length){
                setRecords(recs);
              }
              break;

            default:
              break;
          }
        }
        else if (data.fullDocument.email === user.email || data.fullDocument.userEmail === user.email) {
          switch (data.ns.coll) {
            case "users":
              setUser(data.fullDocument);
              break;
            case "habits":
              let rhabs= habits.filter(ele => ele._id !== data.documentKey._id );
              rhabs.push(data.fullDocument)
              setHabits(rhabs);
              break;
            case "records":
              let rrecs = records.filter(ele => ele._id !== data.documentKey._id);
              rrecs.push(data.fullDocument);
              setRecords(rrecs);
              break;
          
            default:
              break;
          }
        }
      }
  }, [user, habits, records, pupils, socket])

  return (
    loading ? '' :
      <ToastProvider autoDismiss={true} placement ='top-center'>
      <Router>
        <Switch>
          <Route path="/platform">
            {user ? <Base user={user} habits={habits} records={records} pupils={pupils} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/platform" /> : <Login />}
          </Route>
          <Route path="/">
            <LandPage />
          </Route>
        </Switch>
      </Router>
    </ToastProvider>
  );
}

export default App;
