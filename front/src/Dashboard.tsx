import LineChart from "../src/charts/LineChart";
import AulaMasIncidentes from "./charts/AulaMasIncidentes";
import WeeklyStatus from "./charts/WeeklyStatus";


  

function Dashboard() {

    return (
        <div>
            <br/>
            <br/>
            <h1 className="text-center font-monospace fw-bold lh-base" style={{ fontSize: '3rem' }}>
                ¡Bienvenido Coordinador Ejecutivo!
            </h1>
            <br/>
            <div>
                <div >
                    <LineChart />
                </div>
            </div>

            <br/>
            <hr className="mt-3 mb-2"/>
            <br/>

            <div>
                <div >
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

            
            <br/>
            <hr className="mt-3 mb-2"/>
            <br/>


          
            <div>
                <WeeklyStatus />                       
            </div>
        
        </div> 
     );
}

export default Dashboard;