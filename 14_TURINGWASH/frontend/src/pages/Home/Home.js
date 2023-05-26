import "./Home.css"

// hooks
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

// redux
import { getUserCars, chooseCar } from "../../slices/carSlice"
import { getWashers } from "../../slices/washerSlice"

import { Link, useParams } from "react-router-dom"

import WasherItem from "../../components/WasherItem"

const Home = () => {
  const [selectedCar, setSelectedCar] = useState();

  const { loading } = useSelector((state) => state.user)

  const { washers } = useSelector((state) => state.washer)

  const { cars } = useSelector((state) => state.car)

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getUserCars(id))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getWashers())
  }, [dispatch])

  const handleSelectCar = (e) => {
    const carId = e.target.value
    setSelectedCar(carId)
    dispatch(chooseCar(carId));
  };

  // const resetMessage = useResetComponentMessage(dispatch)

  // const { admin } = useSelector((state) => state.authAdmin)

  // const handleLike = (washer) => {
  //   dispatch(like(washer._id))

  //   resetMessage()
  // }

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
        {washers && washers.length > 0 && washers.map((washer) => (
          <div className="home-card" key={washer._id}>
            <div className="home-profile">
              <div className="img">
                <WasherItem washer={washer}/>
              </div>
              <p className="name">{washer.name}</p>
            </div>
            <div className="home-assets">                    
              <div className="home-assets-detail">
                <span className="home-note">Nota {washer.score} ({washer.assessments} avaliações)</span>
                <span className="home-price">R$ {washer.price}</span>        
              </div>            
              <div className="home-assets-buttons">
                <button className="button-assessment">Ver avaliações</button>
                <Link to="/washs/:id">
                  <button type="submit" className="button-wash">Lavar meu carro</button>   
                </Link>
              </div> 
            </div> 
            {/* <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link> */}
          </div>
        ))}
    </div>
  )
}

export default Home