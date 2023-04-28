import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

// components
import Navbar from './components/Navbar';

// pages
import About from './pages/About';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <h1>Context</h1>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/products" element={<Products />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
