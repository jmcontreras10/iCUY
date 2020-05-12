import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import DiaryCard from "./DiaryCard"
import Habit from './Habit'

function Home(props) {

    const [habit, setHabit] = useState({})
    const [select, setSelect]= useState(0)

    useEffect(()=>{
        let a = props.habits.filter((e) => e.inputType === "number")
        console.log(a[0]);
        setHabit(a[0]);
    },[props.habits])

    return (
        <div className="Home">
            <div className="row">
                <div className="col-md-6 col-12 diary">
                    <h1 className="titulo-seccion">Registro tus logros diarios</h1>
                    <div className="accordion" id="DiaryAreas">
                        {
                            props.loading ?
                                <div className="spinner-border text-warning centrado" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :
                                <>
                                    <DiaryCard area={0} user={props.user} habits={props.habits} />
                                    <DiaryCard area={1} user={props.user} habits={props.habits} />
                                    <DiaryCard area={2} user={props.user} habits={props.habits} />
                                </>
                        }
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="select">
                        <label>Selecciona que grafico ver</label>
                        <select name="subarea"value={select} onChange={e =>{console.log(e.target.value); setSelect(e.target.value);setHabit(props.habits[e.target.value])}}>
                            {
                                props.habits.filter((e)=>e.inputType==="number").map((ele, i)=>
                                    <option value={i} key={`select ${i}`}>{ele.title}</option>
                                )
                            }
                        </select>
                    </div>
                    <Habit habit={habit} />
                </div>
            </div>
        </div>
    );
}
Home.propTypes = {
    user: PropTypes.object.isRequired,
    habits: PropTypes.array.isRequired,
    loading:PropTypes.bool.isRequired,
}

export default Home;