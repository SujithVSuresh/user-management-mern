import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const {userData} = useSelector(state => state.userProfile)

  console.log(userData, "userprofile...")

  
  return (
    <div className='w-full h-20 bg-slate-800 px-7 flex items-center'>
        <Link to={'/'}><p className='text-2xl text-white'>CRUD</p></Link>
        {/* {userData && <h1 className='text-white'>{userData.userData.email}</h1>} */}
    </div>
  )
}

export default Header