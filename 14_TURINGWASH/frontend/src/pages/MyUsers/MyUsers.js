import "./MyUsers.css"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../../slices/userSlice"

const MyUsers = () => {
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="users">
      <div className="profile-title">
        <h2>Meus Usuários</h2>
      </div>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div className="profile-user" key={user._id}>
            <div>
              <span>{user.name}</span>
              <p>{user.email}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  )
}

export default MyUsers