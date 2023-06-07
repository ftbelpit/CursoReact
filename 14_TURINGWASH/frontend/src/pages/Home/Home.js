import "./Home.css";

// hooks
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { getUserCars } from "../../slices/carSlice";
import { getWashers } from "../../slices/washerSlice";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

import { useParams, useNavigate, Link } from "react-router-dom";

import WasherItem from "../../components/WasherItem";

const Home = () => {
  const [selectedOrder, setSelectedOrder] = useState("name");
  const [selectedCar, setSelectedCar] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);
  const { washers } = useSelector((state) => state.washer);
  const { cars } = useSelector((state) => state.car);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const resetMessage = useResetComponentMessage(dispatch)

  useEffect(() => {
    dispatch(getUserCars(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getWashers());
  }, [dispatch]);

  const handleWashButtonClick = (washerName) => {
    if (selectedCar) {
      const { fabricante, modelo } = selectedCar;
  
      // Combinar os parâmetros em uma única string
      const params = `fabricanteParam=${encodeURIComponent(
        fabricante
      )}&modeloParam=${encodeURIComponent(modelo)}&washerName=${encodeURIComponent(
        washerName
      )}`;

      resetMessage();
  
      // Redirecionar para a página AddWash com os parâmetros combinados
      navigate(`/addwash/${user._id}?${params}`);
    }
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
            onChange={(e) => {
              const selectedCarId = e.target.value;
              const selectedCar = cars.find((car) => car._id === selectedCarId);

              setSelectedCar(selectedCar);
            }}
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
      {orderedWashers.map((washer, index) => {
        let totalScore = 0;

        washer.assessments.forEach((assessment) => {
          totalScore += assessment.score;
        });

        const averageScore = totalScore / washer.assessments.length;

        return (
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
                  Média de Score: {averageScore.toFixed(2)} ({washer.assessments.length} avaliações)
                </span>
                <span className="home-price">R$ {washer.price}</span>
              </div>
              <div className="home-assets-buttons">
                <Link to={`/assessments/${washer._id}`}>
                  <button className="button-assessment">Ver avaliações</button>
                </Link>
                <button
                  type="submit"
                  className="button-wash"
                  onClick={() => handleWashButtonClick(washer.name)}
                >
                  Lavar meu carro
                </button>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default Home