import React, { useEffect } from 'react'
import Header from '../../components/user/Header'
import Footer from '../../components/user/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { profile } from '../../redux/actions/userAction'
import { logout } from '../../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
import profilePic from '../../assets/profile-user.png'



const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {userData} = useSelector(state => state.userProfile)
  const {token} = useSelector(state => state.userSignin)


  useEffect(() => {
    if(!token){
      navigate('/signin')
    }    
  }, [token])

  useEffect(()=> {
    !userData && dispatch(profile())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }



  

  return (
    <>
    <Header />
    {userData && (
<div className='min-h-screen flex items-center justify-center bg-gray-100'>

<div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
<div class="flex items-center justify-center p-4">
  <img class="w-24 h-24 rounded-full" src={userData.imageURL ? userData.imageURL : profilePic} alt="User Profile" />
</div>
<div class="text-center p-4">
  <h2 class="text-lg font-semibold text-gray-900 capitalize">{userData?.name}</h2>
  <p class="text-gray-600">{userData?.email}</p>
</div>
<div class="p-4 flex flex-col gap-3">
  <button onClick={() => navigate('/editProfile')} class="w-full px-4 py-2 text-white bg-slate-700 rounded-md">Edit Profile</button>
  <button onClick={() => handleLogout()} class="w-full px-4 py-2 text-white bg-slate-700 rounded-md">Logout</button>
</div>
</div>

</div>
    )}

    <Footer />
    </>
  )
}

export default Home