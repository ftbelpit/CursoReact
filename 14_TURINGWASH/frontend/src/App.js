import './App.css';

// Router
import {BrowserRouter, Routes, Route  , Navigate} from "react-router-dom"

// Hooks
import { useAuth } from './hooks/useAuth';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import MyCars from './pages/MyCars/MyCars';
import AddCar from './pages/AddCar/AddCar';
import MyWashs from './pages/MyWashs/MyWashs';
import { useSelector } from 'react-redux';

function App() {
  const {auth, loading} = useAuth()
  const { user } = useSelector((state) => state.auth)

  
  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="container">
        <Routes>
          <Route path="/:id" element={auth ? <Home /> : <Navigate to="/login" />} />
          {!auth ? (
              <Route path="/" element={<Navigate to="/login" />} />
            ) : (
              <Route path="/" element={<Navigate to={`/${user?._id ?? ""}`} />} />
            )
          }
          <Route path="/washs/:id" element={auth ? <MyWashs /> : <Navigate to="/login" />}/>
          <Route path="/cars/:id" element={auth ? <MyCars /> : <Navigate to="/login" />}/>
          <Route path="/addcar/:id" element={auth ? <AddCar /> : <Navigate to="/login" />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />}/>
        </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;