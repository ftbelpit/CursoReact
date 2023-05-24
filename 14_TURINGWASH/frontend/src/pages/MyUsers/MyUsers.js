import "./MyUsers.css"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../../slices/userSlice"


const MyUsers = () => {
  const dispatch = useDispatch()

  const { users } = useSelector((state) => state.user)
  const { loading } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="profile">
      <div className="profile-title">
        <h2>Meus Usuários</h2>
      </div>
      {users && users.length > 0 && users.map((user) => (
          <div className="profile-car" key={user._id}>
            <div>
              <span className="fabricante">{user.name}</span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default MyUsers
