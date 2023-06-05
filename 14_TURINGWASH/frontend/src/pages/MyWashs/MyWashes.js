import "./MyWashes.css"
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Message from "../../components/Message";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

// redux
import { deleteWash, getUserWashes, resetMessage } from "../../slices/washSlice";
import { useParams } from "react-router-dom";
import { getWashers } from "../../slices/washerSlice";

const MyWashes = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const currentDate = new Date();

  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState("");
  const [assessments, setAssessments] = useState("");
  const popupRef = useRef(null);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

const handleRateButtonClick = () => {
    setShowPopup(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Lógica para enviar o score e assessments para o servidor
    // ...

    // Limpar o formulário e fechar o pop-up
    setScore("");
    setAssessments("");
    setShowPopup(false);
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
      const washDate = new Date(wash.date);
      washDate.setDate(washDate.getDate() + 1); // Adiciona um dia à data

      const dataFormatada = format(washDate, "d 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });

      const showRateButton = washDate.getTime() < currentDate.getTime(); // Verifica se a data da lavagem é maior que a data atual

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
              <span className="wash-date">
                {showRateButton && (
                  <button className="rate-button" onClick={handleRateButtonClick}>
                    Avaliar lavador
                  </button>
                )}
              {dataFormatada}
              </span>
              
            </div> 
            {/* <div className="buttons">
              <button className="delete-button" onClick={() => handleDelete(wash._id)}>
                Excluir lavagem
              </button>
            </div> */}
            {showPopup && (
            <div className="popup">
              <div className="popup-content" ref={popupRef}>
                <h3>Avaliar Lavador</h3>
                <form onSubmit={handleFormSubmit}>
                  <label htmlFor="score">Nota (0 a 5):</label>
                  <input
                    type="number"
                    id="score"
                    min={0}
                    max={5}
                    value={score}
                    onChange={(event) => setScore(event.target.value)}
                  />
                  <label htmlFor="assessments">Avaliação:</label>
                  <textarea
                    id="assessments"
                    value={assessments}
                    onChange={(event) => setAssessments(event.target.value)}
                    maxLength={200}
                  />
                  <div className="button-container">
                    <button type="submit">Enviar</button>
                  </div>
                </form>
              </div>
        </div>
      )}
          </div>
          
        )
      })}
      {errorWash && <Message msg={errorWash} type="error"/>}
      {messageWash && <Message msg={messageWash} type="success"/>}
    </div>
  );
};

export default MyWashes