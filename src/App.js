import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Parchas from './Components/Parchas/Parchas';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>

        <Route path='/parchas/:id' element={<Parchas></Parchas>}></Route>
      </Routes>
    </div>
  );
}

export default App;
