import './App.css';
import MyForm from './components/MyForm';

function App() {
  return (
    <div className="App">
      <h2>Forms</h2>
      <MyForm user={{ name: "Felipe", email:"felipe@gmail.com", bio: "Sou um programador", role: "admin" }}/>
    </div>
  );
}

export default App;
