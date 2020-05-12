import React, {useState} from 'react';
import PropTypes from "prop-types";
import DiaryCard from "./DiaryCard"
import Habit from './Habit'

function Home(props) {

    const [habit, setHabit] = useState({
        title: "ToJog",
        description: "Meditate every day",
        isDaily: true,
        userEmail: "jm.contreras10@uniandes.edu.co",
        inputType: "number",
        goalValue: null
    })

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
                    <Habit habit={habit} userEmail={props.user.userEmail} />
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