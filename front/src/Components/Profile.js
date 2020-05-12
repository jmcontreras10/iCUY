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
            <div className="card profile-info">
                <div className="row">
                    <div className="photo">
                        <img className="centrado-h" alt="foto de perfil" src={props.user.image ? props.user.image : defaultPhoto}></img>
                        <button className="btn btn-primary edit centrado-h">
                            <FiEdit3 /> Editar
                        </button>
                    </div>
                    <div className="col information">
                        <h3 className="name">{props.user.name}</h3>
                        <p className="basic-info">
                            Edad: {'35'}
                            <br></br>
                            Telefono : {props.user.phone}
                            <br></br>
                            Direccion : {props.user.address}
                        </p>
                        <hr></hr>
                        <div className="stats">
                            <div className="stat">
                                <h6 className="title centrado-h">Habitos</h6>
                                <p className="value">{`${props.habits.length > 9 ? '' : '0'}${props.habits.length}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-12 habits">
                    <div className="card">
                        <div className="header">
                            <h2 className="title fit">Mis Habitos</h2>
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
                            <form onSubmit={(e) => e.preventDefault()} className={`edit ${habitEdit ? '' : 'd-none'}`}>
                                <div className="row">
                                    <div className="col-12 ">
                                        <div className="inputBox">
                                            <input type="text" name="description" required value={inputs.description} onChange={e => setInput(e.target.value, 'description')} ></input>
                                            <label>Descripcion Habito</label>
                                        </div>
                                    </div>
                                    <div className="col-6 ">
                                        <div className="inputBox">
                                            <input type="text" name="title" required value={inputs.title} onChange={e => setInput(e.target.value, 'title')}></input>
                                            <label>Nombre Corto</label>
                                        </div>
                                    </div>
                                    <div className="col-6 ">
                                        <div className="inputBox">
                                            <input type="text" name="goalValue" required value={inputs.goalValue} onChange={e => setInput(e.target.value, 'goalValue')}></input>
                                            <label>Objetivo</label>
                                        </div>
                                    </div>


                                    <div className="col-6 ">
                                        <div className="checkbox">
                                            <label>Registro Diario</label>
                                            <input className="centrado-h" type="checkbox" name="isDaily" value={inputs.isDaily} onChange={e => setInput(e.target.value, 'isDaily')}></input>
                                        </div>
                                    </div>
                                    <div className="col-6 ">
                                        <div className="checkbox">
                                            <label>Tipo de Registro</label>
                                            <select name="inputType" required value={inputs.inputType} onChange={e => setInput(e.target.value, 'inputType')}>
                                                <option value="number">Numerico</option>
                                                <option value="checkbox">Si/No</option>
                                                <option value="time">Hora</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6 ">
                                        <div className="checkbox">
                                            <label>Area del Habito</label>
                                            <select name="subarea" required value={inputs.subarea} onChange={e => setInput(e.target.value, 'subarea')}>
                                                <option value={1}>Espiritual</option>
                                                <option value={2}>Fisico</option>
                                                <option value={3}>Alimentacion</option>
                                                <option value={4}>Yo</option>
                                                <option value={5}>Nosotros</option>
                                                <option value={6}>Familia</option>
                                                <option value={7}>Aprendizaje</option>
                                                <option value={8}>Proyectos Alternos</option>
                                                <option value={9}>Trabajo Principal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn btn-medium" onClick={() => { setInputs(base); setHabitEdit(false) }}>
                                        Cancelar
                                    </button>
                                    <button className="btn btn-primary" onClick={saveHabit}>
                                        Guardar
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12 board">
                    <div className="card">

                    </div>
                </div>
            </div>
        </div>
    )
}
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    habits: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}
export default Profile;