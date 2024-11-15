import React, { useEffect } from 'react'
import Header from '../../components/admin/Header'
import Footer from '../../components/admin/Footer'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../redux/actions/adminAction'
import { editUser } from '../../redux/actions/adminAction'
import { ADMIN_EDIT_USER_RESET } from '../../redux/constants/adminConstants'


const EditUser = () => {
    const {id} = useParams()
    const {users} = useSelector(state => state.adminUsers)
    const {user} = useSelector(state => state.adminEditUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState({})


    useEffect(() => {
        if(id && users){
            const selectedUser = users?.filter((user) => {
                if(user._id == id){
                    return user
                }
            })[0]
            
            console.log(selectedUser, "selected...")
            if(selectedUser){
                setName(selectedUser?.name)
                setEmail(selectedUser?.email)
            }else{
                navigate('*')
            }
        }

        if(!users){
            dispatch(fetchUsers())
        }

        if(user){
            dispatch({
                type: ADMIN_EDIT_USER_RESET
            })
            navigate('/admin/dashboard')
        }

    }, [id, users, user])


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

      return error
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setError(validate())

        if(isValid){
            dispatch(editUser(name, email, id))
        }

    }


  return (
    <>
    <Header />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-center">Edit User</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name
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

            {/* <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className='text-red-500 text-xs mt-1'>{error?.password}</p>
            </div> */}

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-slate-700 rounded focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
          </div>
         
    </div>
    <Footer />
    </>
  )
}

export default EditUser