import LineChart from "../src/charts/LineChart";
import AulaMasIncidentes from "./charts/AulaMasIncidentes";
import WeeklyStatus from "./charts/WeeklyStatus";

// import BarsChart from "./BarsChart";
// import PiesChart from "./PiesChart";

function Dashboard() {
    return (
        <div>
            {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
            <h1 className="bg-info text-center font-monospace fw-bold lh-base"> ¡Bienvenido! </h1>
            <div>
                <p className="m-2"> Gráfico de líneas básico </p>
                <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"230px"}}>
                    <LineChart />
                </div>
            </div>
            <div>
                <p className="m-2"> Gráfico de líneas básico </p>
                <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"230px"}}>
                    <AulaMasIncidentes />
                </div>
            </div>


            {/* <hr className="mt-3 mb-2"/>
            <div>
                <p className="m-2"><b>Ejemplo #2: </b>Gráfico de barras</p>
                <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"225px"}}>
                    <WeeklyStatus />
                </div>
            </div> */}

            
            <hr className="mt-3 mb-2"/>
            <div>
                <p className="m-2"><b>Ejemplo #3: </b>Gráfico circular</p>
                <div className="bg-light mx-auto border border-2 border-primary" style={{width:"450px", height:"250px"}}>
                    <div style={{width:"100%", height:"100%", padding:"10px 0"}}>
                        <WeeklyStatus />                       
                    </div>
                </div>
            </div>
        </div> 
     );
}

export default Dashboard;