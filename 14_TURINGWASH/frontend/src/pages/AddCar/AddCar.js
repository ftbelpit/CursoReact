import React, { useState } from 'react';

import "./AddCar.css"

const AddCar = () => {

  const [carros, setCarros] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Obtém os valores dos campos do formulário
    const fabricante = e.target.elements.fabricante.value;
    const modelo = e.target.elements.modelo.value;
    const ano = e.target.elements.ano.value;

    // Cria um novo objeto de carro
    const novoCarro = { fabricante, modelo, ano };

    // Atualiza a lista de carros
    setCarros([...carros, novoCarro]);

    // Limpa os campos do formulário
    e.target.reset();
  };
  return (
    <div className="data-car">
      <div className="profile-title">
        <h2>Adicionar carro</h2>
      </div>
      <form id="carForm" onSubmit={handleSubmit}>
        <div className="data-card">
          <label htmlFor="fabricante">Fabricante</label>
          <input type="text" name="fabricante" id="fabricante"/>
        </div>
        <div className="data-card">
          <label htmlFor="modelo">Modelo</label>
          <input type="text" name="modelo" id="modelo"/>
        </div>
        <div className="data-card-ano">
          <label htmlFor="ano">Ano</label>
          <input type="number" name="ano" id="ano"/>
        </div>   
        <div className="add-button">
          <button type="submit">Adicionar carro</button>
        </div>         
      </form>  
    </div>
  )
}

export default AddCar