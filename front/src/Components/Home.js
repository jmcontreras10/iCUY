import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import DiaryCard from "./DiaryCard"
import Habit from './Habit'

function Home(props) {

    const [habit, setHabit] = useState({
        title: "ToMeditate",
        description: "Meditate every day",
        isDaily: true,
        userEmail: "jm.contreras10@uniandes.edu.co",
        inputType: "checkbox",
        goalValue: null
    })

    props.location(useLocation().pathname)

    return (
        <div className="Home">
            <div className="row">
                <div className="col-md-6 col-12 diary">
                    <h1 className="titulo-seccion">Registro tus logros diarios</h1>
                    <div className="accordion" id="DiaryAreas">
                        {
                            props.loading ?
                                <div class="spinner-border text-warning centrado" role="status">
                                    <span class="sr-only">Loading...</span>
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
                    <Habit habit={habit} userEmail={props.user.userEmail} />
                </div>
            </div>
        </div>
    );
}
Home.propTypes = {
    user: PropTypes.object.isRequired,
    habits: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    location: PropTypes.func.isRequired
}

export default Home;