import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import DiaryCard from "./DiaryCard"
import CuyGraph from './CuyGraph'

function Home(props) {

    const [select, setSelect] = useState(0)


    return (
        <div className="Home">
            <div className="row">
                <div className="col-md-6 col-12 diary">
                    <h1 className="titulo-seccion">Registro tus logros diarios</h1>
                    <div className="accordion" id="DiaryAreas">
                        <DiaryCard area={0} user={props.user} habits={props.habits} records={props.records} />
                        <DiaryCard area={1} user={props.user} habits={props.habits} records={props.records}/>
                        <DiaryCard area={2} user={props.user} habits={props.habits} records={props.records}/>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <CuyGraph value={0.9} />
                </div>
            </div>
        </div>
    );
}
Home.propTypes = {
    user: PropTypes.object.isRequired,
    habits: PropTypes.array.isRequired,
    records:PropTypes.array.isRequired
}

export default Home;