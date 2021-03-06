import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Parchas from './Components/Parchas/Parchas';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import RequireAuth from './Components/Shared/RequireAuth';
import { ToastContainer } from 'react-toastify';
import Root from './Components/DashBoard/Root';
import DashBoard from './Components/DashBoard/DashBoard';
import MyOrder from './Components/DashBoard/MyOrder';
import AddReview from './Components/DashBoard/AddReview';
import MyProfile from './Components/DashBoard/MyProfile';
import AllUsers from './Components/DashBoard/AllUsers';
import ManageAllOrder from './Components/DashBoard/ManageAllOrder';
import AddNewProduct from './Components/DashBoard/AddNewProduct';
import Payment from './Components/DashBoard/Payment';
import Blog from './Components/Blog/Blog';
import NotFound from './Components/NotFound/NotFound';
import MyPortfolio from './Components/MyPortfolio/MyPortfolio';
import Prebook from './Components/Home/Prebook';
import AllProduct from './Components/DashBoard/AllProduct';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './Components/firebase.init';

function App() {
  return (
    <div className='bg-sky-100 sm:w-full xs:w-full'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>

        <Route path='/parchas/:id' element={<RequireAuth>
          <Parchas></Parchas>
        </RequireAuth>}></Route>

        <Route path='/signup' element={<SignUp></SignUp>}></Route>

        <Route path='/login' element={<Login></Login>}></Route>

        <Route>
          <Route path='/dashboard' element={<DashBoard></DashBoard>}>

          <Route index element={<MyOrder></MyOrder>}></Route>

          <Route path='addreview' element={<AddReview></AddReview>}></Route>

          <Route path='myprofile' element={<MyProfile></MyProfile>}></Route>

          <Route path='allusers' element={<AllUsers></AllUsers>}></Route>

          <Route path='manageAllOrder' element={<ManageAllOrder></ManageAllOrder>}></Route>

          <Route path='addProduct' element={<AddNewProduct></AddNewProduct>}></Route>

          <Route path='allProductForAdmin' element={<AllProduct></AllProduct>}></Route>

        </Route>
        </Route>
        <Route path='/payment/:id' element={<Payment></Payment>}></Route>

        <Route path='/blog' element={<Blog></Blog>}></Route>

        <Route path='/myPortfolio' element={<MyPortfolio></MyPortfolio>}></Route>

        <Route path='/preebook' element={<Prebook></Prebook>}></Route>

        <Route path='*' element={<NotFound></NotFound>}></Route>

      </Routes>


      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
