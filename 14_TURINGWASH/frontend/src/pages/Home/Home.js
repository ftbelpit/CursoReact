import "./Home.css"

import profile from "../../assets/perfil-de-usuario.png"

import { useSelector } from "react-redux"

const Home = () => {
  const { loading } = useSelector((state) => state.photo)

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="home">
      <div className="home-title">
          <h2>Lavadores disponíveis próximos de você...</h2>
      </div>
        <div className="home-options">
        <div>
          <span>Lavar:</span>
          <select>
            <option>Nissan Kicks</option>
          </select>
        </div>
        <div>
          <span>Ordenar por:</span>
          <select>
            <option>proximidade</option>
          </select>
        </div>
      </div>
      <div className="home-card">
        <div className="home-profile">
          <img src={profile} alt="" />
          <p>João Pereira</p>
        </div>
        <div className="home-assets">                    
          <div className="home-assets-detail">
              <span className="home-note">Nota 4.5 (998 avaliações)</span>
              <span className="home-price">R$ 80</span>        
          </div>            
          <div className="home-assets-buttons">
            <button className="button-assessment">Ver avaliações</button>
            <button type="submit" className="button-wash">Lavar meu carro</button>   
          </div> 
        </div>  
      </div>
      
    </div>
  )
}

export default Home