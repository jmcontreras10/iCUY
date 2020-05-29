import React, { useState } from 'react';
import PropTypes from "prop-types";
import defaultPhoto from "../assets/user.png"
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';

function Profile(props) {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        isDaily: true,
        userEmail: props.user.email,
        inputType: 'number',
        goalValue: '',
        subarea: 1
    });
    const [habitEdit, setHabitEdit] = useState(false);
    const base = {
        title: '',
        description: '',
        isDaily: true,
        userEmail: props.user.email,
        inputType: 'number',
        goalValue: '',
        subarea: 1
    }
    const setInput = (value, title) => {
        let copy = { ...inputs };
        copy[title] = value;
        setInputs(copy);
    }
    const saveHabit = () => {
        console.log(inputs)
        fetch('/habits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        }).then(() => {
            setInputs(base);
            setHabitEdit(false);
        });
    }

    return (
        <div className="Profile">
            <div className="row">
                <div className="col-md-3 col-12 profile">
                    <div className="card profile-info">
                        <div className="photo">
                            <img className="centrado-h" alt="foto de perfil" src={props.user.photo ? props.user.photo : defaultPhoto}></img>
                        </div>
                        {/* <button className="btn btn-primary edit centrado-h">
                            <FiEdit3 /> Editar
                        </button> */}
                        <h3 className="name">{props.user.name}</h3>
                        <h4 className="email">{props.user.email}</h4>
                        <hr></hr>
                        <div className="stats">
                            <div className="stat">
                                <h6 className="title centrado-h">Habitos</h6>
                                <p className="value">{`${props.habits.length > 9 ? '' : '0'}${props.habits.length}`}</p>
                            </div>
                            <div className="stat">
                                <h6 className="title centrado-h">Supervisores</h6>
                                <p className="value">{`${props.spervisors.length > 9 ? '' : '0'}${props.habits.length}`}</p>
                            </div>
                            <div className="stat">
                                <h6 className="title centrado-h">Pupilos</h6>
                                <p className="value">{`${props.pupils.length > 9 ? '' : '0'}${props.habits.length}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-12 board">
                    <div className="row pupils">
                    <div className="card">
                        <div className="header">
                            <h2 className="title fit">Mis Pupilos</h2>
                            <button className="add centrado-v" onClick={() => { setInputs(base); setHabitEdit(true) }}>
                                <BsFillPlusSquareFill />
                            </button>
                        </div>
                        <div className="body">
                            <hr></hr>
                            <div className={`row habits-list no-gutters ${habitEdit ? 'd-none' : ''}`}>
                                {
                                    props.habits.map((ele, i) => {
                                        return (
                                            <div className="col-6 habit" key={`profile-habit-${i}`}>
                                                <div className="habit-item" tabIndex={0} onClick={() => { setInputs(ele); setHabitEdit(true) }} >
                                                    <span className="centrado-v title">
                                                        {ele.title}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

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