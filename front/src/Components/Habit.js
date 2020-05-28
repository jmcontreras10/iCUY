import React, { useState, useEffect } from 'react'
import GraphBoolean from './GraphBoolean'
import GraphNumber from './GraphNumber'
import GraphHour from './GraphHour'
import CuyGraph from './CuyGraph'

const Habit = (props) => {

    const [records, setRecords] = useState(null)

    useEffect(() => {
        console.log(props.habit)
        if(props.habit)
            fetchRecords()
    }, [props.habit])

    const fetchRecords = () => {
        const url = `/records/filter?habitTitle=${props.habit.title}&userEmail=${props.habit.userEmail}`

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(url, requestOptions)
            .then(res => {
                return res.json()
            })
            .then(records => {
                let format = records.map(record => {
                    return {
                        date: record.date,
                        value: record.value
                    }
                });
                setRecords(format)
            })
    }

    const renderSwitch = () => {
        if (props.habit) {
            switch (props.habit.inputType) {
                case 'checkbox':
                    return <GraphBoolean data={records} />
                    break;
                case 'number':
                    return <GraphNumber data={records} />
                    break;
                case 'time':
                    return <GraphHour data={records} />
                    break;
                default:
                    return ""
                    break;
            }
        }
    }

    return (
        <div>
            <div className="w-100 p-3 h-25 flex" style={{ background: '#62bbc5' }}>
                {props.habit ? <h1 style={{ color: '#F2F2F2' }}>{props.habit.title}</h1> : ""}
            </div>
            <CuyGraph value={0.9} />
            <div className="w-100 p-3 h-75 overflow-auto" style={{ maxWidth: '100%' }}>
                {records ? renderSwitch() : ""}
            </div>
        </div>
    )

}

export default Habit