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
import { getWashers, assessment} from "../../slices/washerSlice";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

const MyWashes = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const resetWasher = useResetComponentMessage(dispatch)

  const { 
    // user, 
    loading } = useSelector((state) => state.user)
  // const { user: userAuth } = useSelector((state) => state.auth)
  const { 
    washes, 
    error: errorWash, 
    message: messageWash 
  } = useSelector((state) => state.wash)
  // const {washer} = useSelector((state) => state.washer)

  const currentDate = new Date();

  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const popupRef = useRef(null);

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

    // insert a assessment
  const handleAssessment = (e) => {
    e.preventDefault();
  
    const assessmentData = {
      score: score,
      comment: comment,
      id: washes.washerId
    };
  
    dispatch(assessment(assessmentData));
  
    setScore("");
    setComment("");
    setShowPopup(false);
  
    resetWasher();
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
                  <button className="rate-button" 
                  onClick={handleRateButtonClick}>
                    Avaliar
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
                  <form onSubmit={handleAssessment}>
                    <label >Nota (0 a 5):</label>
                    <input
                      className="input"
                      type="number"
                      onChange={(e) => setScore(e.target.value)}
                      value={score || ""}
                    />
                    <label >Avaliação:</label>
                    <textarea
                      className="textarea"
                      onChange={(e) => setComment(e.target.value)}
                      maxLength={200}
                      value={comment || ""}
                    />
                    <div className="button-container">
                      <input type="submit" value="Enviar" />
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