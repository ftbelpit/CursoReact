import "./Auth.css"

// Components
import { Link } from "react-router-dom"
import Message from "../../components/Message"

// Hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { login, reset } from "../../slices/adminAuthSlice"

const LoginAdmin = () => {
  const [email_admin, setEmailAdmin] = useState("")
  const [password_admin, setPasswordAdmin] = useState("")

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.authAdmin)

  const handleSubmit = (e) => {
    e.preventDefault()

    const admin = {
      email_admin,
      password_admin,
    }

    dispatch(login(admin))
  }

  // Clean all auth states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="login">
      <h2>TuringWash</h2>
      <p className="subtitle">Faça o login como administrador.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="E-mail" 
          onChange={(e) => setEmailAdmin(e.target.value)} 
          value={email_admin || ""}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          onChange={(e) => setPasswordAdmin(e.target.value)} 
          value={password_admin || ""}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {error && <Message msg={error} type="error"/>}
      </form>
    </div>
  )
}

export default LoginAdmin