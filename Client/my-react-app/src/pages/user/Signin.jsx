import React, { useEffect } from 'react'
import Header from '../../components/user/Header'
import Footer from '../../components/user/Footer'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signin } from '../../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { USER_SIGNIN_RESET } from '../../redux/constants/userConstants'


const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({})

  const { token, loading, error: signinError } = useSelector(state => state.userSignin)

  useEffect(() => {
    if (token) {
      navigate('/')
    }

    if (signinError) {
      toast.error("error signin")
    }
  }, [token, signinError])

  useEffect(() => {
    if(token || loading || signinError){
    dispatch({
      type: USER_SIGNIN_RESET
    })
  }
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate())

    if (isValid) {
      dispatch(signin(email, password))
    }
  };
  return (
    <>
      <Header />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <button
                type="submit"
                className="w-full px-4 py-2 text-white focus:ring-4 bg-slate-700 rounded focus:ring-opacity-50"
              >
                {loading ? ". . ." : "Login"}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to={'/signup'}>
                <a className="text-slate-800 hover:underline">
                  Sign up
                </a>
              </Link>
            </p>
          </div>
        </div>


        {signinError && <ToastContainer
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

export default Signin