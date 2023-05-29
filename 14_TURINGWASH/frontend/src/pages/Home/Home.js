import "./Home.css";

// hooks
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// redux
import { getUserCars, chooseCar } from "../../slices/carSlice";
import { getWashers } from "../../slices/washerSlice";

import { Link, useParams, useNavigate } from "react-router-dom";

import WasherItem from "../../components/WasherItem";

const Home = () => {
  const [selectedOrder, setSelectedOrder] = useState("name");
  const [selectedCar, setSelectedCar] = useState();
  const [selectedWasher, setSelectedWasher] = useState();

  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);
  const { washers } = useSelector((state) => state.washer);
  const { cars } = useSelector((state) => state.car);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserCars(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getWashers());
  }, [dispatch]);

  const handleSelectCar = (e) => {
    const carId = e.target.value;
    setSelectedCar(carId);
    dispatch(chooseCar(carId));
  };

  const handleSelectWasher = (washer) => {
    setSelectedWasher(washer);
  };

  const handleSelectOrder = (e) => {
    const order = e.target.value;
    setSelectedOrder(order);
  };

  const orderedWashers = useMemo(() => {
    // Faça uma cópia dos lavadores para evitar a modificação do estado original
    const washersCopy = [...washers];

    // Ordenar os lavadores com base na opção selecionada
    switch (selectedOrder) {
      case "name":
        washersCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "score":
        washersCopy.sort((a, b) => b.score - a.score);
        break;
      case "assessments":
        washersCopy.sort((a, b) => b.assessments - a.assessments);
        break;
      case "price":
        washersCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return washersCopy;
  }, [washers, selectedOrder]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      <div className="home-title">
        <h2>Lavadores disponíveis próximos de você...</h2>
      </div>
      <div className="home-options">
        <div>
          <span>Lavar:</span>
          <select
            className="select-car"
            onClick={handleSelectCar}
            value={selectedCar}
          >
            <option>Selecione um carro</option>
            {cars &&
              cars.length > 0 &&
              cars.map((car) => (
                <option
                  key={car._id}
                  value={car._id}
                  className="select-button"
                >
                  {car.fabricante} {car.modelo}
                </option>
              ))}
          </select>
        </div>
        <div>
          <span>Ordenar por:</span>
          <select
            className="select-ordem"
            onChange={handleSelectOrder}
            value={selectedOrder}
          >
            <option value="assessments">Avaliações</option>
            <option value="name">Nome</option>
            <option value="score">Nota</option>
            <option value="price">Preço</option>
          </select>
        </div>
      </div>
      {orderedWashers.map((washer) => (
        <div className="home-card" key={washer._id}>
          <div className="home-profile">
            <div className="img">
              <WasherItem washer={washer} />
            </div>
            <p className="name">{washer.name}</p>
          </div>
          <div className="home-assets">
            <div className="home-assets-detail">
              <span className="home-note">
                Nota {washer.score} ({washer.assessments} avaliações)
              </span>
              <span className="home-price">R$ {washer.price}</span>
            </div>
            <div className="home-assets-buttons">
              <button className="button-assessment">Ver avaliações</button>
              <Link to={`/washs/${user._id}`}>
                <button
                  type="submit"
                  className="button-wash"
                  onClick={() => handleSelectWasher(washer)}
                >
                  Lavar meu carro
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
