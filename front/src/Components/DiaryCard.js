// Propondría dejar una única carpeta components, no dos con un nombre similar, pues puede resultar confuso para los desarrolladores que vean el proyecto.
import React, { useState, useEffect, useRef } from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { MdErrorOutline } from 'react-icons/md'
const DiaryCard = (props) => {
    const [first, setFisrt] = useState([])
    const [second, setSecond] = useState([])
    const [third, setThird] = useState([])
    const [available, setAvailable] = useState(0);
    const [inputs, setInputs] = useState({})
    const areas = [
        {
            title: "Salud",
            codigos: [1, 2, 3],
            subareas: [
                "Espiritual",
                "Fisica",
                "Alimentacion"
            ]
        },
        {
            title: "Relaciones",
            codigos: [4, 5, 6],
            subareas: [
                "Yo",
                "Nosotros",
                "Familia"
            ]
        },
        {
            title: "Trabajo",
            codigos: [7, 8, 9],
            subareas: [
                "Aprendizaje",
                "Proyectos Alternos",
                "Trabajo Principal"
            ]
        }
    ]
    useEffect(() => {
        let copy = { ...inputs }
        let sortHabits = (a, b) => {
            if (a.inputType == b.inputType)
                return 0
            return a.inputType > b.inputType ? 1 : -1
        }
        let count = 0;
        let data = props.habits
            .filter(h => h.isDaily && h.goalValue == areas[props.area].codigos[0])
            .sort(sortHabits);
        count += data.length == 0 ? 0 : 1;
        data.map(ele => {
            if (copy[ele.title] == undefined) {
                // Siento que es mejor práctica inicializar value en '' y quitar el default del switch. Juan Pablo Correa.
                let value='';
                switch (ele.inputType) {
                    case 'number':
                        value = 0;
                        break;
                    case 'time':
                        value = "";
                        break;

                    case 'checkbox':
                        value = false;
                        break;
                }
                copy[ele.title] = value;
            }
        });
        setFisrt(data);
        data = props.habits
            .filter(h => h.isDaily && h.goalValue == areas[props.area].codigos[1])
            .sort(sortHabits);
        count += data.length == 0 ? 0 : 1;
        data.map(ele => {
            if (copy[ele.title] == undefined) {
                let value;
                switch (ele.inputType) {
                    case 'number':
                        value = 0;
                        break;
                    case 'time':
                        value = "";
                        break;

                    case 'checkbox':
                        value = false;
                        break;
                    default:
                        value = ''
                        break;
                }
                copy[ele.title] = value;
            }
        });
        setSecond(data);
        data = props.habits
            .filter(h => h.isDaily && h.goalValue == areas[props.area].codigos[2])
            .sort(sortHabits);
        count += data.length == 0 ? 0 : 1;
        data.map(ele => {
            if (copy[ele.title] == undefined) {
                let value;
                switch (ele.inputType) {
                    case 'number':
                        value = 0;
                        break;
                    case 'time':
                        value = "";
                        break;

                    case 'checkbox':
                        value = false;
                        break;
                    default:
                        value = ''
                        break;
                }
                copy[ele.title] = value;
            }
        });
        setThird(data);
        setAvailable(count);
        setInputs(copy);
        console.log('inputs', copy)
    }, []);

    const setInput = (value, title) => {
        let copy = { ...inputs };
        copy[title] = value;
        setInputs(copy);
    }
    const saveHabit = (title) => {
        let d = new Date();
        let send = {
            date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
            userEmail: props.user.email,
            habitTitle: title,
            value: inputs[title]
        }
        fetch('/records/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(send)
        })
    }

    const defineSubarea = (num, data) => {
        if (data.length > 0) {
            let tamano = (available == 3 && num != 3) ? 6 : 12;
            let col1, col2 = [];
            if (tamano == 12) {
                col1 = data.filter((ele, i) => i % 2 == 0)
                col2 = data.filter((ele, i) => i % 2 == 1)
            }
            return (
                <div className={`col-${tamano} subarea`}>
                    <div className="header">
                        <h3 className="text centrado-v">
                            {areas[props.area].subareas[num - 1]}
                        </h3>
                    </div>
                    <div className="row">
                        {
                            tamano == 12 ? (
                                <>
                                    <div className="col-6 pr">
                                        {
                                            col1.map((ele, i) => {
                                                return (
                                                    <div className="habitItem" key={`1-${i}`}>
                                                        <span className="centrado-v d-block">
                                                            {ele.title}
                                                        </span>
                                                        <div className="input centrado-v">
                                                            <input value={inputs[ele.title]} onBlur={() => saveHabit(ele.title)} onChange={e => setInput(e.target.value, ele.title)} className="centrado-h" type={ele.inputType}></input>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="col-6 pl">
                                        {
                                            col2.map((ele, i) => {
                                                return (
                                                    <div className="habitItem" key={`2-${i}`}>
                                                        <span className="centrado-v d-block">
                                                            {ele.title}
                                                        </span>
                                                        <div className="input centrado-v">
                                                            <input value={inputs[ele.title]} onBlur={() => saveHabit(ele.title)} onChange={e => setInput(e.target.value, ele.title)} className="centrado-h" type={ele.inputType}></input>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            ) : (
                                    <div className="col-12 ">
                                        {
                                            data.map((ele, i) => {
                                                return (
                                                    <div className="habitItem" key={i}>
                                                        <span className="centrado-v d-block">
                                                            {ele.title}
                                                        </span>
                                                        <div className="input centrado-v">
                                                            <input value={inputs[ele.title]} onBlur={() => saveHabit(ele.title)} onChange={e => setInput(e.target.value, ele.title)} className="centrado-h" type={ele.inputType}></input>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                        }
                    </div>
                </div>
            );
        }
        return '';
    }
    return (
        <div className=" DiaryCard card">
            <div className={`card-header ${props.area == 0 ? "" : "collapsed"}`} data-toggle="collapse" data-target={`#collapse${props.area}`} aria-expanded="true" aria-controls={`collapse${props.area}`} tabIndex={0}>
                <h2 className="centrado-v title">
                    {areas[props.area].title}
                </h2>
                <div className="centrado-v collapse-icon closed ">
                    <FaChevronDown />
                </div>
                <div className="centrado-v collapse-icon open ">
                    <FaChevronUp />
                </div>
            </div>
            <div id={`collapse${props.area}`} className={`collapse ${props.area == 0 ? "show" : ""}`} aria-labelledby={`heading${props.area}`} data-parent="#DiaryAreas">

                <div className="card-body">
                    <div className="row subareas no-gutters">
                        {
                            first.length == 0 && second.length == 0 && third.length == 0 ?
                                <div className="col empty">
                                    <div className="empty-icon centrado-h fit">
                                        <MdErrorOutline/>
                                    </div>
                                    <h3 className="empty-text">Parece que no has creado ningun habito en esta categoria, crea uno nuevo en tu perfil. </h3>
                                </div>
                                :
                                <>
                                    {defineSubarea(1, first)}
                                    {defineSubarea(2, second)}
                                    {defineSubarea(3, third)}
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
DiaryCard.propTypes = {
    area: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    habits: PropTypes.array.isRequired
}
export default DiaryCard;
