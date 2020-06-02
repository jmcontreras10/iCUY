import React, {useState, useEffect} from 'react'
import Chart from 'react-apexcharts'

const GraphNumber = (props) => {

    //Filtering
        const [options, setOptions]= useState(undefined);
        const [series,setSeries]=useState(undefined);

    useEffect(() => {

        const dat = props.data;
        let data;
        
        if (dat.length > 0) {
            data = dat.filter(d =>(d.habitTitle===props.habit && d.date > new Date(Date.now() - 7)))
            data.sort((a, b) => {
                let AEl = new Date(a.date), BEl = new Date(b.date);
                if (AEl < BEl) return -1;
                if (AEl > BEl) return 1;
                return 0;
            });

            setOptions({
                chart: {
                    id: 'Dates'
                },
                xaxis: {
                    categories: data.map(record => record.date)
                }
            })

            setSeries ([{
                name: 'Number',
                data: data.map(record => record.value)
            }])
            
        }


    }, [props.data,props.habit]);

    return (
        <div className="w-100 h-75 position-absolute bottom-0 ">
            {series&&options?<Chart options={options} series={series} type="line" width={"80%"} height={"100%"} />:"Cargando..."}
        </div>
    )

}

export default GraphNumber

