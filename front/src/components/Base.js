import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation,
    Redirect,
    Link
} from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./Home";
//import Profile from "./Profile";
// Veo que tienen un componente perfil pero no lo están usando. En la página me redirige de nuevo al inicio. Quizá deberían importarlo asi
import Profile from "../Components/Profile";
import logo from "../assets/icuymaslogo.png";
import defaultPhoto from "../assets/user.png"
function Base(props) {
    const [location, setLocation] = useState(useLocation().pathname);
    const [loading, setLoading] = useState(true);
    const [habits, setHabits] = useState([]);
    useEffect(() => {
        fetch(`/habits/filter?userEmail=${props.user.email}`)
            .then(res => res.json())
            .then(hab => {
                setHabits(hab);
                setLoading(false);
            })
    }, []);
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
                                    <Link className={`nav-link ${location == "/platform" ? 'active' : ''}`} to="/platform">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location == "/platform/profile"?'active':''}`} to="/platform/profile">Perfil</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location == "/platform/habits" ? 'active' : ''}`}  to="/platform/habits">Mis Habitos</Link>
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
                            <Profile user={props.user} habits={habits} loading={loading} location={setLocation} />
                        </Route>
                        <Route path="/platform/*">
                             <Redirect to="/platform" />
                        </Route>
                        <Route path="/platform">
                            <Home user={props.user} habits={habits} loading={loading} location={setLocation}/>
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
