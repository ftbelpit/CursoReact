import "./Navbar.css"

// Components 
import {NavLink, Link, Navigate} from "react-router-dom"

// Hooks
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// Redux
import { logout, reset } from "../slices/authSlice"

const Navbar = () => {
  const { auth } = useAuth()
  const { user } = useSelector((state) => state.auth) 

  const [query, setQuery] = useState("")

  const navigate =  useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    
    navigate("/login")
  }

  return (
    <nav id="nav">
      <Link to="/">TuringWash</Link>

      <ul id="nav-links">
        {auth ? (
          <>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <span>Meus carros</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <span>Minhas lavagens</span>
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}      
      </ul>
    </nav>
  )
}

export default Navbar