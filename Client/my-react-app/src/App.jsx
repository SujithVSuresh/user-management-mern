import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import Signin from './pages/user/Signin';
import Signup from './pages/user/Signup';
import Home from './pages/user/Home';
import { USER_SIGNIN_SUCCESS } from './redux/constants/userConstants';
import { ADMIN_SIGNIN_SUCCESS } from './redux/constants/adminConstants';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import ForNotFor from './pages/user/ForNotFor';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AddUser from './pages/admin/AddUser';
import EditProfile from './pages/user/EditProfile';
import 'react-toastify/dist/ReactToastify.css';
import EditUser from './pages/admin/EditUser';




function App() {
  const dispatch = useDispatch()
  
  useLayoutEffect(() => {
    const token = Cookies.get('accessToken');
    const adminToken = Cookies.get('adminAccessToken')
    if (token) {
      dispatch({
        type:USER_SIGNIN_SUCCESS,
        payload: token
    }) 
    }
    if(adminToken){
      dispatch({
        type:ADMIN_SIGNIN_SUCCESS,
        payload: adminToken
    }) 
    }
}, []);


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path='/editProfile' element={<EditProfile />} />

      <Route path='/admin/login' element={<Login />} />
      <Route path='/admin/dashboard' element={<Dashboard />} />
      <Route path='/admin/addUser' element={<AddUser />} />
      <Route path='/admin/editUser/:id' element={<EditUser />} />

      <Route path="*" element={<ForNotFor />} />
      
    </Routes>

    
  </BrowserRouter>
  )
}

export default App
