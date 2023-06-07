import "./Assessments.css"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWasher } from "../../slices/washerSlice";
import { useParams } from "react-router-dom";

const Assessments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Obtém as avaliações do lavador do Redux Store
  const { washer, loading } = useSelector((state) => state.washer);

  useEffect(() => {
    dispatch(getWasher(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="assessments">
      <h2 className="profile-title">Avaliações do Lavador</h2>
      {washer.assessments && washer.assessments.length > 0 ? (
        washer.assessments.map((assessment, index) => (
          <div className="assessment-user" key={`${assessment._id}-${index}`}>
            <div className="assessment-info">
              <span className="name">Nome do usuário: {assessment.userName}</span>
              <span className="score">Nota: {assessment.score}</span>
              <span className="assessment">Avaliação: {assessment.assessment}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="no-assessment">Nenhuma avaliação encontrada.</p>
      )}
    </div>
  );
};

export default Assessments;
