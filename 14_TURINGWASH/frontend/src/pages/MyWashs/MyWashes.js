import "./MyWashes.css"
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Message from "../../components/Message";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// redux
import { deleteWash, getUserWashes, resetMessage } from "../../slices/washSlice";
import { useParams } from "react-router-dom";
import { getWashers } from "../../slices/washerSlice";

const MyWashes = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { 
    // user, 
    loading } = useSelector((state) => state.user)
  // const { user: userAuth } = useSelector((state) => state.auth)
  const { 
    washes, 
    error: errorWash, 
    message: messageWash 
  } = useSelector((state) => state.wash)

  useEffect(() => {
    dispatch(getUserWashes(id))
    dispatch(getWashers())
  }, [dispatch, id])

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleDelete = (id) => {
    dispatch(deleteWash(id))
    resetComponentMessage()
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="wash-list">
      <div className="profile-title">
        <h2>Minhas lavagens</h2>
      </div>
      {washes && washes.length > 0 && washes.map((wash) => {
      const data = new Date(wash.date);
      data.setDate(data.getDate() + 1); // Adiciona um dia à data

      const dataFormatada = format(data, 'd \'de\' MMMM \'de\' yyyy', { locale: ptBR });

        return (
          <div className="wash-card" key={wash._id}>
            <div className="wash-info">
              <span>Lavador</span>
              <span>{wash.washer.name}</span>
            </div>
            <div className="wash-car">
              <span>Carro</span>
              <span>{wash.car.fabricante} {wash.car.modelo}</span>
            </div>
            <div className="wash-price-date">
              <span className="wash-price">R$ {wash.washerPrice}</span>
              <span className="wash-date">{dataFormatada}</span>
            </div> 
            <button className="delete-button" onClick={() => handleDelete(wash._id)}>
              Excluir carro
            </button>
          </div>
        )
      })}
      {errorWash && <Message msg={errorWash} type="error"/>}
      {messageWash && <Message msg={messageWash} type="success"/>}
    </div>
  );
};

export default MyWashes
