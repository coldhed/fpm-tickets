import LineChart from "../src/charts/LineChart";
import AulaMasIncidentes from "./charts/AulaMasIncidentes";
import WeeklyStatus from "./charts/WeeklyStatus";
import React, { useEffect, useState } from 'react';





function Dashboard() {

    const [tiempoPromedio, setTiempoPromedio] = useState(null);

    useEffect(() => {
        fetch('https://127.0.0.1:4000/dashboard/tiempo-promedio-cierre', {
            method: "GET",
            headers: new Headers({ Authentication: localStorage.getItem("auth") as string }),
        })
            .then((response) => response.json())
            .then((data) => setTiempoPromedio(data.tiempoFinal))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <br />
            <br />
            <h1 className="text-center font-monospace fw-bolder lh-base" style={{ fontSize: '3rem' }}>
                ¡Bienvenido Coordinador Ejecutivo!
            </h1>
            <br />
            <br />
            <hr className="mt-3 mb-2" />
            <br />
            <br />

            <div>
                <p className="text-center fw-bold " style={{ fontSize: '2rem' }} >Tiempo promedio de cierre de tickets: </p>
                <br />
                <div>
                    {tiempoPromedio !== null ? (
                        <p className="text-center fw-bolder " style={{ fontSize: '2rem', color: 'green' }}> {tiempoPromedio} horas</p>
                    ) : (
                        <p className="text-center font-monospace fw-bold lh-base" style={{ fontSize: '1rem' }}> Cargando tiempo promedio... </p>
                    )}
                </div>
            </div>

            <br />
            <br />
            <hr className="mt-3 mb-2" />


            <div>
                <LineChart />
            </div>
            <br />
            <hr className="mt-3 mb-2" />
            <br />

            <div>
                <AulaMasIncidentes />
            </div>


            <br />
            <hr className="mt-3 mb-2" />
            <br />
            <div>
                <WeeklyStatus />
            </div>

        </div>
    );
}

export default Dashboard;