import "./MyWashs.css"

// hooks
import { useSelector } from "react-redux";

const MyWashs = () => {
  const selectedCar = useSelector((state) => state.car.selectedCar);

  return (
    <div className="wash-list">
      <div className="profile-title">
        <h2>Minhas lavagens</h2>
      </div>
      {selectedCar && (
        <div className="wash-card">
          <div className="wash-info">
            <span>Lavador</span>
            <span>Joana Santos</span>
          </div>
          <div className="wash-car">
            <span>Carro</span>
              <span>
                {selectedCar.fabricante}{" "}
                {selectedCar.modelo}{" "}
                {selectedCar.ano}
              </span>
          </div>
          <div className="wash-price-date">
            <span className="wash-price">R$ 75</span>
            <span className="wash-date">1 de agosto de 2022</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWashs