import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { chartStyle, chartTitleStyle, chartContainerStyle } from '../styles/ChartStyles';

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



export default function LineChart() {
    const [frecuencia, setFrecuencia] = useState([]);
    const [categoria, setCategoria] = useState([]);

    async function lineChartData() {
        const request = new Request("https://127.0.0.1:4000/dashboard/category-usage", {
            method: "GET",
            headers: new Headers({ Authentication: localStorage.getItem("auth") }),
        });
        
        
        try {
            let response = await fetch(request);
            
            let data = await response.json();
            
            setFrecuencia(data.usageCounts);
            setCategoria(data.categoryTypes);

            
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (frecuencia.length === 0)
            lineChartData();
    })

    const midata = {
        labels: categoria,
        datasets: [
          {
            label: 'Categorías más y menos reportadas',
            data: frecuencia,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(68,150,64)',
            backgroundColor: 'rgb(68,150,64,0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgb(68,150,64)',
            pointBackgroundColor: 'rgb(68,150,64)',
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
          <p style={chartTitleStyle}>Categorías reportadas</p>
          <Line data={midata} options={options} />
        </div>
      );



}

