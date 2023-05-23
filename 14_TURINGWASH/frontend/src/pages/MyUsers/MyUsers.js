import { useDispatch, useSelector } from "react-redux"
import "./MyUsers.css"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getUserDetails } from "../../slices/userSlice"

const MyUsers = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.user)
  const { user: userAuth } = useSelector((state) => state.auth)

    // load user data
    useEffect(() => {
      dispatch(getUserDetails(id))
    }, [dispatch, id])

  if(loading) {
    return <p>Carregando...</p>
  }


    // Exibe a lista de usuários se o usuário autenticado for um administrador e houver usuários disponíveis
    return (
      <div id="profile">
        <div className="profile-title">
          <h2>Meus Usuários</h2>
        </div>
      </div>
    )
  
}

export default MyUsers