import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";

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

    var midata = {
        labels: aula,
        datasets: [ 
            {
                label: 'Aula con más y menos reportes',
                data: frecuencia,
                tension: 0.5,
                fill : true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
        ],
    };
    

    return (
        <div>

            <Line data={midata} />

        </div>
    )



}

