import "./MyWashs.css"

// hooks
import { useDispatch, useSelector } from "react-redux";

import { getWashers } from "../../slices/washerSlice";
import { useEffect } from "react";

const MyWashs = () => {
  const selectedCar = useSelector((state) => state.car.selectedCar);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWashers())
  }, [dispatch])

  const {washer} = useSelector((state) => state.washer)

  return (
    <div className="wash-list">
      <div className="profile-title">
        <h2>Minhas lavagens</h2>
      </div>
      {selectedCar && (
        <div className="wash-card">
          <div className="wash-info">
            <span>Lavador</span>
            <span>{washer.name}</span>
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