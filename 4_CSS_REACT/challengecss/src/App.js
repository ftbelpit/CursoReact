import './App.css';
import Car from './components/Car';

function App() {
  const myCars = [
    { name: "Roma", brand: "Ferrari", color: "Vermelha" },
    { name: "Fox", brand: "VW", color: "Preta" },
    { name: "Onix", brand: "Chevrolet", color: "Branca" },
  ]
  return (
    <div className="App">
      <h1>Carros</h1>
      <div className="car-container">
        {myCars.map((car) => (
          <Car car={car}/>
        ))}
      </div>
    </div>  
  );
}

export default App;
