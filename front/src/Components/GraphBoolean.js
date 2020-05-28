import React from 'react'
import Chart from 'react-apexcharts'

const GraphBoolean = (props) => {

    //  Getting data

    const data = props.data.map(
        record => {
            return {
                date: new Date(record.date),
                value: record.value
            }
        }
    )

    //  From: https://dyclassroom.com/javascript-code/create-an-array-of-dates-between-start-date-and-end-date-in-javascript

    const getDateArray = function (start, end) {

        let
            arr = new Array(),
            dt = new Date(start);

        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }

        return arr;

    }

    //  Sorting data by date

    data.sort((a, b) => {
        let AEl = a.date, BEl = b.date;
        if (AEl < BEl) return -1;
        if (AEl > BEl) return 1;
        return 0;
    });

    //  Creating an array of dates

    const dateArr = getDateArray(data[0].date, data[data.length - 1].date);

    dateArr.map(
        date =>{
            
        }
    )

    const years = []

    for (let index = data[0].date.getFullYear(); index <= data[data.length - 1].date.getFullYear(); index++) {
        years.push(index)
    }

    years.map(
        year =>{
            return {
                year: year,
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'].map(
                    month =>{
                        return {
                            month: month,
                            vals:""
                        }
                    }
                )
            }
        }
    )


    const info = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: years
            }
        },
        series: [
            {
                name: "Done",
                // data: records
            }
        ]
    };
    /*<Chart options = {info.options} series={info.series} type="heatmap" width={"80%"} height={"100%"} />*/

    return (
        <div className="w-100 h-75 position-absolute bottom-0 ">

        </div>
    )

}

export default GraphBoolean
