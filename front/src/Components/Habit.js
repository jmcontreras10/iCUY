import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import Salud from "../assets/Salud.svg";
import Relaciones from "../assets/Relaciones.svg";
import Trabajo from "../assets/Trabajo.svg";
import { MdErrorOutline } from 'react-icons/md'
import {
    GiMeditation,
    GiBarbecue,
    GiWeightLiftingUp,
    GiBriefcase,
    GiGraduateCap,
    GiCherish,
    GiMedallist,
    GiLovers,
    GiThreeFriends,
    GiBeamsAura
} from 'react-icons/gi'
import { icons } from 'react-icons/lib/cjs';
import { set } from 'd3';

const Habit = (props) => {
    const icons = [
        <GiMeditation />,
        <GiWeightLiftingUp />,
        <GiBarbecue />,
        <GiBeamsAura />,
        <GiLovers />,
        <GiThreeFriends />,
        <GiGraduateCap />,
        <GiCherish />,
        <GiBriefcase />,
    ]
    const [areas, setAreas] = useState([
        {
            title: "Salud",
            codigos: [1, 2, 3],
            color: "tertiary",
            subareas: [
                "Espiritual",
                "Fisica",
                "Alimentacion"
            ]
        },
        {
            title: "Relaciones",
            codigos: [4, 5, 6],
            color: "primary",
            subareas: [
                "Yo",
                "Nosotros",
                "Familia"
            ]
        },
        {
            title: "Trabajo",
            codigos: [7, 8, 9],
            color: "quaternary",
            subareas: [
                "Aprendizaje",
                "Proyectos",
                "Principal"
            ]
        }
    ]);
    const [newHabit, setNewHabit] = useState(false);
    const [inputs, setInputs] = useState(null);

    const base = {
        title: '',
        description: '',
        isDaily: true,
        userEmail: props.user.email,
        inputType: 'number',
        goalValue: '',
        unit: '',
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
            if (newHabit) {
                setInput(null)
                setNewHabit(false);
            }
        });
    }
    const getHabits = (group) => {
        let habits = props.habits
            .filter((h) => areas[group].codigos.includes(h.subarea))
            .sort((a, b) => a.subarea - b.subarea);
        return (
            <div className={"card centrado-v " + areas[group].color}>
                <div className="card-header">
                    <h3 className="m-0">{areas[group].title}</h3>
                </div>
                <div className="card-body">
                    <div className="row  no-gutters ">
                        {
                            habits.length > 0 ?
                                habits.map((ele, i) => {
                                    return (
                                        <div className="col-6 habit" key={`habit-${i}`}>
                                            <div className={`habit-item ${ele === inputs ? 'active' : ''}`} tabIndex={0} onClick={() => { setInputs(ele) }}>
                                                <span className="title">
                                                    {ele.title}
                                                </span>
                                                <div className="icon fit centrado-v">
                                                    {icons[ele.subarea - 1]}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="col empty">
                                    <div className="empty-icon centrado-h fit">
                                        <MdErrorOutline />
                                    </div>
                                    <h4 className="empty-text">Parece que no has creado ningun habito en esta categoria. </h4>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="Habit">
            <div className="row contain">
                <div className="col-md-7 col-12 areas">
                    <div className="row new">
                        <button className="btn btn-secondary mx-2 float-right" onClick={() => { setInputs(base); setNewHabit(true) }}>
                            Crear Nuevo Habito
                        </button>
                    </div>
                    <div className="row area">
                        <div className="col-7 habits-list">
                            {getHabits(0)}
                        </div>
                        <div className="col-5 cuy-img">
                            <img className="centrado" alt="" src={Salud}></img>
                        </div>
                    </div>
                    <div className="row area">
                        <div className="col-5 cuy-img">
                            <img className="centrado" alt="" src={Relaciones}></img>
                        </div>
                        <div className="col-7 habits-list">
                            {getHabits(1)}
                        </div>
                    </div>
                    <div className="row area">
                        <div className="col-7 habits-list">
                            {getHabits(2)}
                        </div>
                        <div className="col-5 cuy-img">
                            <img className="centrado" alt="" src={Trabajo}></img>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-12 info">
                    {
                        inputs ?
                        <>
                            <div className="row details">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="m-0">{newHabit ? "Nuevo Habito" : "Detalles"}</h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => e.preventDefault()} className="edit">
                                            <div className="row">
                                                <div className="col-6 ">
                                                    <div className="inputBox">
                                                        <input type="text" name="title" required value={inputs.title} onChange={e => setInput(e.target.value, 'title')}></input>
                                                        <label>Nombre Corto</label>
                                                    </div>
                                                </div>
                                                <div className="col-6 ">
                                                    <div className="checkbox">
                                                        <label>Registro Diario</label>
                                                        <input className="centrado-h" type="checkbox" name="isDaily" checked={inputs.isDaily} onChange={e => setInput(!inputs.isDaily, 'isDaily')}></input>
                                                    </div>
                                                </div>
                                                <div className="col-12 ">
                                                    <div className="inputBox">
                                                        <input type="text" name="description" required value={inputs.description} onChange={e => setInput(e.target.value, 'description')} ></input>
                                                        <label>Descripcion Habito</label>
                                                    </div>
                                                </div>

                                                <div className="col-4 ">
                                                    <div className="inputBox">
                                                        <label className="no-animate">Tipo de Registro</label>
                                                        <select name="inputType" required value={inputs.inputType} onChange={e => { setInput('', 'goalValue'); setInput(e.target.value, 'inputType') }}>
                                                            <option value="number">Numerico</option>
                                                            <option value="checkbox">Si/No(completado)</option>
                                                            <option value="time">Hora</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {
                                                    inputs.inputType !== "checkbox" ?
                                                        <div className="col-4 ">
                                                            <div className="inputBox">
                                                                <input type={inputs.inputType} name="goalValue" required value={inputs.goalValue} onChange={e => setInput(inputs.inputType === 'number' ? parseInt(e.target.value) : e.target.value, 'goalValue')}></input>
                                                                <label className={inputs.inputType === "time" ? "no-animate" : ""}>Objetivo</label>
                                                            </div>
                                                        </div>
                                                        : ''
                                                }
                                                {
                                                    inputs.inputType === "number" ?
                                                        <div className="col-4 ">
                                                            <div className="inputBox">
                                                                <input type="text" name="unit" required value={inputs.unit} onChange={e => setInput(e.target.value, 'unit')}></input>
                                                                <label>Unidad(ej.vasos)</label>
                                                            </div>
                                                        </div>
                                                        : ''
                                                }
                                                <div className="col-12 mb-3">
                                                    <h4>Selecciona un area</h4>
                                                    <div className="select-area row">
                                                        {
                                                            areas.map(area => {
                                                                return (
                                                                    <div className={"col area-container " + area.color} key={"area-" + area.title}>
                                                                        <label className="area-title centrado-h">{area.title}</label>
                                                                        <div className="circle centrado-h">
                                                                            {
                                                                                area.subareas.map((subarea, i) => {
                                                                                    return (
                                                                                        <div className={`sub-area ${inputs.subarea === area.codigos[i] ? 'active' : ''}`} key={'subarea-' + subarea} onClick={() => setInput(area.codigos[i], 'subarea')}>
                                                                                            <span>{subarea}</span>
                                                                                            <div className="icon fit">
                                                                                                {icons[area.codigos[i] - 1]}
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary mx-2 float-right" onClick={saveHabit}>
                                                        Guardar
                                                    </button>
                                                    {
                                                        newHabit &&
                                                        <button className="btn btn-medium mx-2 float-right" onClick={() => {setInputs(null); setNewHabit(false); }}>
                                                            Cancelar
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="row graph">
                                                    
                            </div>
                        </>
                          :
                            <h3>Selecciona algun habito para ver la informacion</h3>
                    }

                </div>
            </div>
        </div>
    )

}

Habit.propTypes = {
    user: PropTypes.object.isRequired,
    habits: PropTypes.array.isRequired,
    records: PropTypes.array.isRequired
}


export default Habit