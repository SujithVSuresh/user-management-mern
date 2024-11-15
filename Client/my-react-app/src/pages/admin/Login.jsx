import React, { useEffect } from 'react'
import Header from '../../components/admin/Header'
import Footer from '../../components/admin/Footer'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/actions/adminAction'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie"




const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  const { adminToken, error: loginError } = useSelector(state => state.adminSignin)  


  useEffect(() => {
    if (adminToken) {
      navigate('/admin/dashboard')
    }

    if(loginError){
      toast.error(loginError)
    }
  }, [adminToken, loginError])

  let isValid = true

  const validate = () => {
    const error = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minLengthRegex = /^.{8,}$/;


    if (!email) {
      error.email = "This field is required"
      isValid = false
    } else if (!emailRegex.test(email)) {
      error.email = "Enter a valid email"
      isValid = false
    }

    if (!password) {
      error.password = "This field is required"
      isValid = false
    } else if (!minLengthRegex.test(password)) {
      error.password = "Password should be atleast 8 character long"
      isValid = false
    }

    return error
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validate())
    if(isValid){
    dispatch(login(email, password))
    }
}

  return (
    <>
      <Header />
      <div className='min-h-screen'>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className='text-red-500 text-xs mt-1'>{error?.email}</p>

              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className='text-red-500 text-xs mt-1'>{error?.password}</p>

              </div>
              <button
                type="submit"
                className={`w-full bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
        {loginError && <ToastContainer
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
      <Footer />
    </>
  )
}

export default Login