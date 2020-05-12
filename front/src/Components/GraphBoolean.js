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

    const dateArr = getDateArray(data[0].date, data[data.length - 1].date);
    console.log(dateArr)

    //  Creating an array of dates


    /*
        Date.prototype.addDays = (days) => {
            const dat = new Date()
            dat.setDate(dat.getDate() + days);
            return dat;
        }
    
        const getDates = (startDate, stopDate) => {
            let dateArray = new Array();
            let currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(currentDate)
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }
    
        let dateArray = getDates(minDate, maxDate);
    
        //  Adding all dates
    
        const isInArray = (array, value) => {
            return (array.find(item => { return item == value }) || []).length > 0;
        }
    
        const formatDate = (date) => {
            const d = date,
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
    
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
    
            return [year, month, day].join('-');
        }
    */
    const records = data.map(
        date => {
            //return isInArray(dates, date) ? { x: formatDate(date), y: 29 } : { x: formatDate(date), y: 11 }
        }
    )

    const info = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "Done",
                data: records
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
