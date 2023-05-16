import "./AddCar.css"

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";


// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux
import { getUserDetails } from "../../slices/userSlice";
import { 
  // getUserCars, 
  publishCar, 
  // resetMessage, 
  // deleteCar, 
  // updateCar 
} from "../../slices/carSlice";


const AddCar = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const { user, loading } = useSelector((state) => state.user)
  const { user: userAuth } = useSelector((state) => state.auth)
  const { 
    cars, 
    loading: loadingCar, 
    error: errorCar, 
    message: messageCar 
  } = useSelector((state) => state.car)
 
  const [fabricante, setFabricante] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  // const [editId, setEditId] = useState()
  // const [editFabricante, setEditFabricante] = useState('');
  // const [editModelo, setEditModelo] = useState('');
  // const [editAno, setEditAno] = useState('');

  const newCarForm = useRef();
  // const editCarForm = useRef();

  // useEffect(() => {
  //   dispatch(getUserDetails(id))
  //   dispatch(getUserCars(id))
  // }, [dispatch, id])

  resetMessage()

  const submitHandle = (e) => {
    e.preventDefault();

    const carData = {
      fabricante,
      modelo,
      ano
    }

    const formData = new FormData()

    const carFormData = Object.keys(carData).forEach((key) => 
      formData.append(key, carData[key])  
    )

    formData.append("car", carFormData)

    dispatch(publishCar(formData))

    setFabricante("")
    setModelo("")
    setAno("")

    resetMessage()
  }

  // const handleDelete = (id) => {
  //   dispatch(deleteCar(id))

  //   resetMessage()
  // }

  const hideOrShowForms = () => {
    newCarForm.current.classList.toggle("hide")
    // editCarForm.current.classList.toggle("hide")
  }

  // const handleEdit = (car) => {
  //   if (editCarForm.current.classList.contains("hide")) {
  //     hideOrShowForms();
  //   }

  //   setEditId(car._id);
  //   setEditFabricante(car.fabricante);
  //   setEditModelo(car.modelo);
  //   setEditAno(car.ano)
  // };

  // // Cancel editing
  // const handleCancelEdit = () => {
  //   hideOrShowForms();
  // };

  // // Update car
  // const handleUpdate = (e) => {
  //   e.preventDefault();

  //   const carData = {
  //     fabricante: editFabricante,
  //     modelo: editModelo,
  //     ano: editAno,
  //     id: editId,
  //   };

  //   dispatch(updateCar(carData));

  //   resetMessage();
  // };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="data-car">
      <div className="profile-title">
        <h2>Adicionar carro</h2>
      </div>
      {id === userAuth._id && (
        <>
          <div ref={newCarForm}>
            <form id="carForm" onSubmit={submitHandle}>
              <div className="data-card">
                <label htmlFor="fabricante">Fabricante</label>
                <input
                  type="text"
                  name="fabricante"
                  id="fabricante"
                  placeholder="Insira um fabricante"
                  onChange={(e) => setFabricante(e.target.value)}
                  value={fabricante}
                />
              </div>
              <div className="data-card">
                <label htmlFor="modelo">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  id="modelo"
                  placeholder="Insira um modelo"
                  onChange={(e) => setModelo(e.target.value)}
                  value={modelo}
                />
              </div>
              <div className="data-card-ano">
                <label htmlFor="ano">Ano</label>
                <input
                  type="text"
                  name="ano"
                  id="ano"
                  placeholder="Insira um ano"
                  onChange={(e) => setAno(e.target.value)}
                  value={ano}
                />
              </div>
              <div className="add-button">
              {!loadingCar && <button type="submit">Adicionar carro</button>}
              {loadingCar && (
                <button type="submit" disabled>Aguarde...</button>
              )}
              </div>
            </form>
          </div>
        </>
      )}     
    </div>
  );
}

export default AddCar