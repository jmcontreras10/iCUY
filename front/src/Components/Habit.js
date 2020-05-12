import React, { useState, useEffect } from 'react'
import GraphBoolean from './GraphBoolean'
import GraphNumber from './GraphNumber'
import GraphHour from './GraphHour'

const Habit = (props) => {

    const [habit, setHabit] = useState({})
    const [records, setRecords] = useState(null)

    useEffect(() => {
        fetchHabit()
        fetchRecords()
    }, [])

    const fetchHabit = () => {
        const url = `/habits/filter?title=${props.title}&userEmail=${props.userEmail}`

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch(url, requestOptions)
            .then(res => {
                return res.json()
            })
            .then(habits => {
                setHabit(habits[0])
            })
    }


    const fetchRecords = () => {
        const url = `/records/filter?habitTitle=${props.title}&userEmail=${props.userEmail}`

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch(url, requestOptions)
            .then(res => {
                return res.json()
            })
            .then(records => {
                let format =  records.map(record => {
                        return {
                            date: record.date,
                            value: record.value
                        }
                    });
                setRecords(format)
            })
    }

    const renderSwitch = () => {
        switch (habit.inputType) {
            case 'boolean':
                return<GraphBoolean data={records} />
                break;
            case 'number':
                return <GraphNumber data={records} /> 
                break;
            case 'hour':
                return <GraphHour data={records} />
                break;
            default:
                return ""
                break;
        }
    }

    return (
        <div>
            <div className="w-100 p-3 h-25 flex" style={{ background: 'green' }}>
                {habit.title ? <h1 style={{ color: '#F2F2F2' }}>{habit.title}</h1> : ""}
            </div>
            <div className="w-100 p-3 h-75 overflow-auto" style={{ maxWidth: '100%' }}>
                {records?renderSwitch():""}
            </div>
        </div>
    )

}

export default Habit