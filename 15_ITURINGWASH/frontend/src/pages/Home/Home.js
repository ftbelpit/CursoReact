import "./Home.css"

import profile from "../../assets/perfil-de-usuario.png"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { useSelector } from "react-redux"
import { getUserCars, chooseCar } from "../../slices/carSlice"
import { Link, useParams } from "react-router-dom"

const Home = () => {
  const [selectedCar, setSelectedCar] = useState();

  const { cars, loading } = useSelector((state) => state.car)

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getUserCars(id))

  }, [dispatch, id])

  const handleSelectCar = (e) => {
    const carId = e.target.value
    setSelectedCar(carId)
    dispatch(chooseCar(carId));
  };

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="home">
      <div className="home-title">
          <h2>Lavadores disponíveis próximos de você...</h2>
      </div>
        <div className="home-options">
        <div>
          <span>Lavar:</span>
          <select className="select-car" onChange={handleSelectCar} value={selectedCar}>
            <option>Selecione um carro</option>
          {cars && cars.length > 0 && cars.map((car) => (
              <option key={car._id} value={car._id} className="select-button">
                {car.fabricante} {car.modelo}
              </option>
          ))}
          </select>
        </div>
        <div>
          <span>Ordenar por:</span>
          <select>
            <option>proximidade</option>
          </select>
        </div>
      </div>
      <div className="home-card">
        <div className="home-profile">
          <img src={profile} alt="" />
          <p>João Pereira</p>
        </div>
        <div className="home-assets">                    
          <div className="home-assets-detail">
              <span className="home-note">Nota 4.5 (998 avaliações)</span>
              <span className="home-price">R$ 80</span>        
          </div>            
          <div className="home-assets-buttons">
            <button className="button-assessment">Ver avaliações</button>
            <Link to={`/washs/${selectedCar}`}>
              <button type="submit" className="button-wash">Lavar meu carro</button>   
            </Link>
          </div> 
        </div>  
      </div>
    </div>
  )
}

export default Home