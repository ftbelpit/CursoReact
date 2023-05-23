import "./Navbar.css"

// Components 
import {NavLink, Link} from "react-router-dom"

// Hooks
// import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// Redux
import { logout, reset } from "../slices/authSlice"
import { useAuthAdmin } from "../hooks/useAuthAdmin"
// ...

const Navbar = () => {
  const { auth } = useAuth();
  const { authAdmin } = useAuthAdmin();
  const { user: userAuth } = useSelector((state) => state.auth);
  const { adminAuth } = useSelector((state) => state.authAdmin);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <nav id="nav">
      <Link to={`/${userAuth?._id ?? ""}`}>TuringWash</Link>
      <ul id="nav-links">
        {authAdmin ? (
          <>

              <li>
                <NavLink to="/myusers">
                  <span>Meus usuários</span>
                </NavLink>
              </li>
    
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            {auth && (
              <>
                {userAuth && (
                  <li>
                    <NavLink to={`/cars/${userAuth._id}`}>
                      <span>Meus carros</span>
                    </NavLink>
                  </li>
                )}
                {userAuth && (
                  <li>
                    <NavLink to={`/washs/${userAuth._id}`}>
                      <span>Minhas lavagens</span>
                    </NavLink>
                  </li>
                )}
                <li>
                  <span onClick={handleLogout}>Sair</span>
                </li>
              </>
            )}
            {!auth && !authAdmin && (
              <>
                <li>
                  <NavLink to="/login">Entrar</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Cadastrar</NavLink>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
