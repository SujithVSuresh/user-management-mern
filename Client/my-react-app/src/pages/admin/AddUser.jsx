import React, { useLayoutEffect, useState, useEffect } from 'react'
import Header from '../../components/admin/Header'
import Footer from '../../components/admin/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../../redux/actions/adminAction'
import { useDispatch } from 'react-redux'
import { ADMIN_ADD_USER_RESET } from '../../redux/constants/adminConstants'
import { ToastContainer, toast } from 'react-toastify';

const AddUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});


    const {adminToken} = useSelector(state => state.adminSignin)
    const {user, error: addUserError} = useSelector(state => state.adminAddUser)

    useEffect(() => {
      if(!adminToken){
      navigate('/admin/login')
      }
  }, [adminToken])


    useEffect(() => {
      if(addUserError){
        toast.error(addUserError)
      }
      if(user){
        dispatch({
          type: ADMIN_ADD_USER_RESET
        })
        navigate('/admin/dashboard')
      }
    }, [user, addUserError])


    let isValid = true

    const validate = () => {
      const error = {}
      const nameRegex = /^[a-zA-Z]{3,}(?: [a-zA-Z]{3,})*$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const minLengthRegex = /^.{8,}$/;

      if(!name){
        error.name = "This field is required"
        isValid = false
      }else if(!nameRegex.test(name)){
        error.name = "Enter a valid name"
        isValid = false
      }

      if(!email){
        error.email = "This field is required"
        isValid = false
      }else if(!emailRegex.test(email)){
        error.email = "Enter a valid email"
        isValid = false
      }

      if(!password){
        error.password = "This field is required"
        isValid = false
      }else if(!minLengthRegex.test(password)){
        error.password = "Password should be atleast 8 character long"
        isValid = false
      }

      if(!confirmPassword){
        error.confirmPassword = "This field is required"
        isValid = false
      }else if(confirmPassword != password){
        error.confirmPassword = "Password does'nt match"
        isValid = false
      }
      return error
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validate())
        if(isValid){
        dispatch(addUser(name, email, password))
        }
      };
      
  return (
    <>
    <Header />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
            <p className='text-red-500 text-xs mt-1'>{error?.name}</p>

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
            <p className='text-red-500 text-xs mt-1'>{error?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            <p className='text-red-500 text-xs mt-1'>{error?.password}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm your password"
            />
            <p className='text-red-500 text-xs mt-1'>{error?.confirmPassword}</p>
          </div>


          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-slate-800 rounded focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>

        {addUserError && <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />}

      </div>
    </div>
    <Footer />
    </>
    
  )
}

export default AddUser