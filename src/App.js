import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Parchas from './Components/Parchas/Parchas';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>

        <Route path='/parchas/:id' element={<Parchas></Parchas>}></Route>

        <Route path='/signup' element={<SignUp></SignUp>}></Route>

        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
