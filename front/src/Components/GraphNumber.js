import React, {useEffect, useState} from 'react'
import Chart from 'react-apexcharts'
import { GiUnstableOrb } from 'react-icons/gi'

const GraphNumber = (props) => {

    //Filtering
        let options;
        let series;

    useEffect(() => {

        const dat = props.data;
        let data;
        
        if (dat.length > 0) {
            data = dat.filter(d =>{
                if(d.habitTitle==props.habit && d.date > new Date(Date.now() - 7))
                    return d
            })
            data.sort((a, b) => {
                let AEl = new Date(a.date), BEl = new Date(b.date);
                if (AEl < BEl) return -1;
                if (AEl > BEl) return 1;
                return 0;
            });

            options = {
                chart: {
                    id: 'Dates'
                },
                xaxis: {
                    categories: data.map(record => record.date)
                }
            }

            series = [{
                name: 'Number',
                data: data.map(record => record.value)
            }]
            
        }


    }, []);

    return (
        <div className="w-100 h-75 position-absolute bottom-0 ">
            {series!=undefined&&options!=undefined?<Chart options={options} series={series} type="line" width={"80%"} height={"100%"} />:"Cargando..."}
        </div>
    )

}

export default GraphNumber

