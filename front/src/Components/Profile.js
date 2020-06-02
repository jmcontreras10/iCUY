import React, { useState } from 'react';
import PropTypes from "prop-types";
import defaultPhoto from "../assets/user.png"
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { MdErrorOutline } from 'react-icons/md'
import CuyGraph from './CuyGraph'

function Profile(props) {
    const [newSupervisor, setNewSupervisor] = useState(false);
    return (
        <div className="Profile">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-12 profile">
                        <div className="card profile-info">
                            <div className="photo centrado-h">
                                <img alt="foto de perfil" src={props.user.photo ? props.user.photo : defaultPhoto}></img>
                            </div>
                            <h3 className="name">{props.user.name}</h3>
                            <h4 className="email">{props.user.email}</h4>
                            <hr></hr>
                            <div className=" row stats">
                                <div className="stat col">
                                    <h6 className="title centrado-h">Habitos</h6>
                                    <p className="value">{`${props.habits.length > 9 ? '' : '0'}${props.habits.length}`}</p>
                                </div>
                                <div className="stat col">
                                    <h6 className="title centrado-h">Supervisores</h6>
                                    <p className="value">{`${props.user.supervisors.length > 9 ? '' : '0'}${props.user.supervisors.length}`}</p>
                                </div>
                                <div className="stat col">
                                    <h6 className="title centrado-h">Pupilos</h6>
                                    <p className="value">{`${props.user.pupils.length > 9 ? '' : '0'}${props.user.pupils.length}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7 col-12 board">
                        <div className="row supervisors">
                            <div className="card">
                                <div className="header">
                                    <h2 className="title fit">Mis Supervisores</h2>
                                    <button className="add centrado-v" onClick={() => { setNewSupervisor(true) }}>
                                        <BsFillPlusSquareFill />
                                    </button>
                                </div>
                                <div className="body">
                                    <hr></hr>
                                    <div className={`row habits-list no-gutters ${newSupervisor?'d-none':''}`}>
                                        {
                                            props.user.supervisors.length > 0 ? (
                                                props.user.supervisors.map((ele, i) => {
                                                    return (
                                                        <div className="col-6 habit" key={`profile-supervisor-${i}`}>
                                                            <div className="habit-item"  >
                                                                <span className="centrado-v title">
                                                                    {ele}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                    <div className="col empty">
                                                        <div className="empty-icon centrado-h fit">
                                                            <MdErrorOutline />
                                                        </div>
                                                        <h4 className="empty-text">Parece que no has registrado ningun supervisor. </h4>
                                                    </div>
                                                )
                                        }

                                    </div>
                                    {/* <div className={`row habits-list no-gutters ${newSupervisor ?'': 'd-none'}`}>
                                        di

                                    </div> */}


                                </div>
                            </div>
                        </div>
                        <div className="row pupils">
                            <div className="card">
                                <div className="header">
                                    <h2 className="title fit">Mis Pupilos</h2>
                                </div>
                                <div className="body">
                                    <hr></hr>
                                    <div className="row habits-list no-gutters ">
                                        {
                                            props.user.pupils.length > 0 && props.pupils ? (
                                                props.user.pupils.map((ele, i) => {
                                                    return (
                                                        <div className="col-12 pupil" key={`profile-pupil-${i}`}>
                                                            <span className=" title">
                                                                <strong>{ele}</strong>
                                                            </span>
                                                            <CuyGraph completed={props.pupils[ele].records.length} total={props.pupils[ele].habits.length} />
                                                            <hr></hr>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                    <div className="col empty">
                                                        <div className="empty-icon centrado-h fit">
                                                            <MdErrorOutline />
                                                        </div>
                                                        <h4 className="empty-text">Parece que nadie te ha registrado como supervisor. </h4>
                                                    </div>
                                                )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    habits: PropTypes.array.isRequired,
}
export default Profile;