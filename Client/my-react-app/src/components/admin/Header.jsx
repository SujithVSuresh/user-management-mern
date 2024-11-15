import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAdmin } from '../../redux/actions/adminAction'
import { Link } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()
    const {adminToken} = useSelector(state => state.adminSignin)
    const {count} = useSelector(state => state.userCount)

    const handleLogout = () => {
        dispatch(logoutAdmin())   
    }
  return (
<div className="w-full h-20 bg-slate-800 flex items-center justify-between px-4 shadow-md">
  <div>
    <p className='font-bold text-2xl text-white'><Link to={'/admin/dashboard'}><p className='text-2xl text-white'>ADMIN DASHBOARD</p></Link></p>
  </div>

{
  adminToken && (
    <div>
      <h2 className='text-white'>{count}</h2>
    <button
      onClick={() => handleLogout()}
      className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-md transition duration-300 ease-in-out"
    >
      Logout
    </button>
  
   
    <Link to="/admin/addUser">
      <button className="px-4 py-2 bg-gray-400 ml-5 text-white font-semibold rounded-md transition duration-300 ease-in-out">
        Add User
      </button>
    </Link>
    </div>

  )
}

</div>

  )
}

export default Header