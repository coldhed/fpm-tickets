import React from 'react';

import { Line } from "react-chartjs-2";
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
} from "chart.js";

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

var beneficios = [0, 56, 73, 82, 83, 89, 71, 98, 34, 60, 87, 23];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var midata = {
    labels: meses,
    datasets: [
        {
            label: "Beneficios",
            data: beneficios,
            tension: 0.5,
            fill: true,
            borderColor: "rgb(255,99,132)",
            backgroundColor: "rgba(255,99,132,0.5",
            pointRadius: 5,
            pointBorderColor: "rgba(255,99,132",
            pointBackgroundColor: "rgba(255,99,132)",
        },
    ],
};

var misoptions = {

};

export default function LineChart(){
    return (
        <div>
            <Line data={midata} options={misoptions}/>
        </div>
    ) 
}