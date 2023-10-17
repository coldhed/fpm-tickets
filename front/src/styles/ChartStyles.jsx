

const chartStyle = {
    backgroundColor: 'white',
    boxShadow: '6px 6px 10px #888888', // Agregar sombra
    border: '1px solid #ccc', // Cambiar el color del borde si lo deseas
    borderRadius: '10px',
    padding: '20px',
    margin: '20px auto',
    width: '900px', // ancho
    height: '600px', // altura
  };
  
  
const chartTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'black', // Cambiar el color del título aquí
    
};

const chartContainerStyle = {
    ...chartStyle,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
};


export { chartStyle, chartTitleStyle, chartContainerStyle };
