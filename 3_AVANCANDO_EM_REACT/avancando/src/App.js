import { useState } from 'react';
import './App.css';

import City from "./assets/city.jpg"
import CarDetails from './components/CarDetails';
import ConditionalRender from './components/ConditionalRender';
import ListRender from './components/ListRender';
import ManageData from './components/ManageData';
import ShowUserName from './components/ShowUserName';
import Fragment from './components/Fragment';
import Container from './components/Container';
import ExecuteFunction from './components/ExecuteFunction';
import Message from './components/Message';
import ChangeMessageState from './components/ChangeMessageState';
import UserDetails from './components/UserDetails';

function App() {
  // const name = "Joaquim"
  const [userName] = useState("Felipe")

  const cars = [
    {id: 1, brand: "Ferrari", color:"Amarela", newCar: true, km: 0},
    {id: 2, brand: "KIA", color:"Branco", newCar: false, km: 34343},
    {id: 3, brand: "Renault", color:"Azul", newCar: false, km: 234},
  ]

  function showMessage() {
    console.log("Evento do componente pai!")
  }

  const [message, setMessage] = useState("")

  const handleMessage = (msg) => {
    setMessage(msg)
  }

  const users = [
    {id: 1, nome: "Felipe", idade: 19, profissao: "Programador"},
    {id: 2, nome: "Diego", idade: 20, profissao: "Engenheiro"},
    {id: 3, nome: "Eduardo", idade: 15, profissao: "Estudante"},

  ]

  return (
    <div className="App">
      <h1>Avançando em React</h1>
      {/* imagem em public */}
      <div>
        <img src="/img1.jpg" alt="Paisagem" />
      </div>
      {/* imagem em asses*/}
      <div>
        <img src={City} alt="Cidade" />
      </div>
      <ManageData/>
      <ListRender/>
      <ConditionalRender/>
      {/* props */}
      <ShowUserName name={userName} />
      {/* destructuring */}
      <CarDetails brand="VW" km={100000} color="Azul" newCar={false}/>
      {/* reaproveitando */}
      <CarDetails brand="Ford" color="Vermelha" km={0} newCar={true}/>
      <CarDetails brand="Fiat" color="Branco" km={4500} newCar={false}/>
      {/* loop em array de objetos */}
      {cars.map((car) => (
        <CarDetails 
          key={car.id}
          brand={car.brand} 
          color={car.color} 
          km={car.km} 
          newCar={car.newCar}/>
      ))}
      {/* fragment */}
      <Fragment propFragment="teste"/>
      {/* children */}
      <Container myValue="Testing">
        <p>E este é o conteúdo</p>
      </Container>
      <ExecuteFunction myFunction={showMessage} />
      {/* state lift */}
      <Message msg={message} />
      <ChangeMessageState handleMessage={handleMessage} />
      <UserDetails/>
      {/* tarefa */}  
      {users.map((user) => (
        <UserDetails 
          key={user.id}
          nome={user.nome} 
          idade={user.idade} 
          profissao={user.profissao} />
      ))}
    </div>
  );
}

export default App;