import "./Home.css"

// components
// import LikeContainer from "../../components/LikeContainer"
import WasherItem from "../../components/WasherItem"
import { Link } from "react-router-dom"

// hooks
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"

// redux
import { getWashers } from "../../slices/washerSlice"

const HomeAdmin = () => {
  const dispatch = useDispatch()

  // const resetMessage = useResetComponentMessage(dispatch)

  // const { admin } = useSelector((state) => state.authAdmin)
  const { washers, loading } = useSelector((state) => state.washer)

  // load all washers
  useEffect(() => {

    dispatch(getWashers())

  }, [dispatch])

  // const handleLike = (washer) => {
  //   dispatch(like(washer._id))

  //   resetMessage()
  // }

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="home">
       <div className="home-title">
          <h2>Lavadores cadastrados</h2>
      </div>
      {washers && washers.length > 0 ? (
        washers.map((washer) => (
          <div className="home-card" key={washer._id}>
            <div className="home-profile">
              <div className="img">
                <WasherItem washer={washer}/>
              </div>
              <p className="name">{washer.name}</p>
            </div>
            <div className="home-assets">                    
              <div className="home-assets-detail">
                <span className="home-note">Nota {washer.score} ({washer.assessments} avaliações)</span>
                <span className="home-price">R$ {washer.price}</span>        
              </div>            
              <div className="home-assets-buttons">
                <button className="button-assessment">Ver avaliações</button>
              </div> 
            </div> 
            {/* <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link> */}
          </div>
        ))
      ) : (
        <h2 className="no-photos">
          Ainda não há lavadores cadastrados.{" "}
        </h2>
      )}
      <div>
        <Link to="/washers">
          <button>Cadastrar lavador</button>
        </Link>
      </div>
    </div>
  )
}

export default HomeAdmin