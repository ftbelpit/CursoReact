import "./Washer.css";
import Message from "../../components/Message";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertWasher, resetMessage } from "../../slices/washerSlice";

const Washer = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.admin);
  const { loading: loadingWasher, message: messageWasher, error: errorWasher } = useSelector(
    (state) => state.washer
  );

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [assessments, setAssessments] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Alterado para null

  const newWasherForm = useRef();

  const handleFile = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const washerData = {
      name,
      score,
      assessments,
      price,
      image
    };

    // build form data
    const formData = new FormData();

    for (const key in washerData) {
      formData.append(key, washerData[key]);
    }

    dispatch(insertWasher(formData));

    setName("");
    setScore("");
    setAssessments("");
    setPrice("");
    setImage(null); // Resetar para null após o envio do formulário

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="data-car">
      <div className="profile-title">
        <h2>Cadastrar lavador</h2>
      </div>
      <div ref={newWasherForm}>
        <form id="washerForm" onSubmit={submitHandle}>
          <div className="data-card">
            <label>Imagem</label>
            <input type="file" onChange={handleFile} />
            <label>Nome</label>
            <input
              type="text"
              placeholder="Insira o nome"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
            />

            <label>Nota</label>
            <input
              type="text"
              placeholder="Insira a nota de 0 a 5"
              onChange={(e) => setScore(e.target.value)}
              value={score || ""}
            />

            <label>Avaliações</label>
            <input
              type="text"
              placeholder="Insira a quantidade de avaliações"
              onChange={(e) => setAssessments(e.target.value)}
              value={assessments || ""}
            />
            <label>Preço</label>
            <input
              type="text"
              placeholder="Insira um preço"
              onChange={(e) => setPrice(e.target.value)}
              value={price || ""}
            />
          </div>
          <div className="add-button">
            {!loadingWasher && <input type="submit" value="Cadastrar" />}
            {loadingWasher && <input type="submit" disabled value="Aguarde..." />}
          </div>
        </form>
      </div>
      {errorWasher && <Message msg={errorWasher} type="error" />}
      {messageWasher && <Message msg={messageWasher} type="success" />}
    </div>
  );
};

export default Washer;
