import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation,
    Redirect
} from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./Home";
import Profile from "./Profile";
// import Profile from "./Profile";
import logo from "../assets/icuymaslogo.png";
import defaultPhoto from "../assets/user.png"
function Base(props) {
    const [location] = useState(useLocation().pathname);
    const [loading, setLoading] = useState(true);
    const [habits, setHabits] = useState([]);
    useEffect(() => {
        fetch(`/habits/filter?userEmail=${props.user.email}`)
            .then(res => res.json())
            .then(hab => {
                setHabits(hab);
                setLoading(false);
            })
    }, [props.user]);
    return (
        <>
            {props.user.nuevo ? '' :
                <>
                    <nav className="Base">
                        <a className="logo" href="/">
                            <img className="centrado-v" alt="Logo iCUY" src={logo}></img>
                        </a>
                        <div className="links centrado-v">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className={`nav-link ${location === "/platform" ? 'active' : ''}`} href="/platform">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${location === "/platform/profile"?'active':''}`} href="/platform/profile">Perfil</a>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav profile centrado-v">
                            <li className="nav-item dropdown">
                                <img className="profile dropdown-toggle" alt="mini profile" src={props.user.image ? props.user.image : defaultPhoto} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileMenu">
                                    <a className="dropdown-item" href="/profile">Mi Perfil</a>
                                    <a className="dropdown-item" onClick={() => fetch("/auth/logout")} href="/login">Cerrar Sesion</a>

                                </div>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        {/* <Route path="/profile/:id">
                    <Profile user={props.user} solicitudes={solicitudes}/>
                </Route> */}
                        <Route path="/platform/profile">
                            <Profile user={props.user} habits={habits} loading={loading} />
                        </Route>
                        <Route path="/platform/*">
                             <Redirect to="/platform" />
                        </Route>
                        <Route path="/platform">
                            <Home user={props.user} habits={habits} loading={loading} />
                        </Route>
                    </Switch>
                </>
            }
        </>
    );
}
Base.propTypes = {
    user: PropTypes.object.isRequired
}
export default Base;