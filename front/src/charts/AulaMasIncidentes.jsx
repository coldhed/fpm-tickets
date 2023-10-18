import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { chartContainerStyle, chartStyle, chartTitleStyle } from '../styles/ChartStyles';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



export default function AulaMasIncidentes() {
    const [frecuencia, setFrecuencia] = useState([]);
    const [aula, setAula] = useState([]);

    async function aulaChart() {
        const request = new Request("https://127.0.0.1:4000/dashboard/tickets-per-aula", {
            method: "GET",
            headers: new Headers({ Authentication: localStorage.getItem("auth") }),
        });
        
        
        try {
            let response = await fetch(request);
            
            let data = await response.json();
            
            setFrecuencia(data.ticketCounts);
            setAula(data.aulaNames);

            
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (frecuencia.length === 0)
            aulaChart();
    })

    const midata = {
        labels: aula,
        datasets: [ 
            {
                label: 'Aula con más y menos reportes',
                data: frecuencia,
                tension: 0.5,
                fill : true,
                backgroundColor: 'rgb(195,45,51,0.5)', // Rojo
                borderColor: 'rgb(195,45,51)', // Rojo
                pointRadius: 5,
                pointBorderColor: 'rgb(195,45,51)',
                pointBackgroundColor: 'rgb(195,45,51)',
            },
        ],
    };

    const xAxisOptions = {
        type: 'linear', // Asegura que el eje x sea lineal
        min: 0, // Establece el valor mínimo en 0
        max: Math.max(...frecuencia) + 10, // Ajusta el valor máximo según tus datos
    };
      
    const options = {
        scales: {
          x: [xAxisOptions], // Aplica las opciones del eje x
          y: {
            beginAtZero: true,
          },
        },
    };
    

    return (
        <div style={chartContainerStyle}>
          <p style={chartTitleStyle}>Aulas con reportes</p>
          <Line data={midata} options={options} />
        </div>
    );



}

