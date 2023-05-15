import "./Profile.css"

// components
import { Link } from "react-router-dom"

// hooks


// redux



const Profile = () => {

  return (
    <div id="profile">
        <div className="profile-title">
          <h2>Meus Carros</h2>
        </div>
        <div className="profile-car"> 
          <div>
            <span className="fabricante">Nissan</span> <span className="modelo">Kicks</span>
            <p className="ano">2018</p>
          </div>
          <button className="delete-button">Excluir carro</button>
        </div>        
        <div className="add-button">
          <Link to="/addcar">
            <button className="add-button">Adicionar carro</button>
          </Link>
        </div>
    </div>
  )
}
export default Profile