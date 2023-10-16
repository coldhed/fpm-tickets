import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { chartStyle, chartTitleStyle, chartContainerStyle } from '../styles/ChartStyles';


// import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler,
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// );


ChartJS.register(ArcElement, Tooltip, Legend);





export default function WeeklyStatus() {
    const [frecuencia, setFrecuencia] = useState([]);
    const [status, setStatus] = useState([]);

    async function statusChart() {
        const request = new Request("https://127.0.0.1:4000/dashboard/tickets-by-status", {
            method: "GET",
            headers: new Headers({ Authentication: localStorage.getItem("auth") }),
        });
        
        
        try {
            let response = await fetch(request);
            
            let data = await response.json();
            
            setFrecuencia(data.ticketCounts);
            setStatus(data.statuses);

            
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (frecuencia.length === 0)
            statusChart();
    })

    var midata = {
        labels: status,
        datasets: [ 
            {
                label: 'Aula con más y menos reportes',
                data: frecuencia,
                backgroundColor: [
                    'rgb(68,150,64, 0.5)', // Verde
                    'rgb(195,45,51, 0.5)', // Rojo
                  ],
                borderColor: [
                    'rgb(68,150,64,1)', // Verde
                    'rgb(195,45,51,1)', // Rojo
                  ],
                borderWidth: 1,
            },
        ],
    };
    

    return (
        <div style={chartContainerStyle}>
          <p style={chartTitleStyle}>Estado de los Reportes</p>
          <Pie data={midata} />
        </div>
    );



}

