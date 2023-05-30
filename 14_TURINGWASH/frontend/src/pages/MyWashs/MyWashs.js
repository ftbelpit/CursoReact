import "./MyWashs.css"

// hooks
import { useDispatch } from "react-redux";


import { getWashers } from "../../slices/washerSlice";
import { useEffect } from "react";

const MyWashs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWashers())
  }, [dispatch])

  return (
    <div className="wash-list">
      <div className="profile-title">
        <h2>Minhas lavagens</h2>
      </div>
        <div className="wash-card">
          <div className="wash-info">
            <span>Lavador</span>
            <span></span>
          </div>
          <div className="wash-car">
            <span>Carro</span>
            <span>
              
            </span>
          </div>
          <div className="wash-price-date">
            <span className="wash-price">R$ </span>
            <span className="wash-date">1 de agosto de 2022</span>
          </div>
        </div>
    </div>
  );
};

export default MyWashs