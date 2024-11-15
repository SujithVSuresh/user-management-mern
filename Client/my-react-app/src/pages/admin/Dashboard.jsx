import React, { useEffect, useState } from 'react'
import Header from '../../components/admin/Header'
import Footer from '../../components/admin/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, deleteUser } from '../../redux/actions/adminAction'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import profilePic from '../../assets/profile-user.png'
import { Link } from 'react-router-dom'



const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchRef = useRef(null);

    const [displayUsers, setDisplayUsers] = useState([])

    const {users} = useSelector(state => state.adminUsers)

    const {adminToken} = useSelector(state => state.adminSignin)

    useEffect(() => {
      if(!adminToken){
      navigate('/admin/login')
      }
  }, [adminToken])

    useEffect(() => {
      if(!users && adminToken){
        dispatch(fetchUsers())
      }else{
        setDisplayUsers(users)
      }
      
    }, [users])

    

    const handleDeleteUser = (userId) => {
        const result = confirm("Are you sure you want to proceed?");
        if(result){
            dispatch(deleteUser(userId))
        }
    }

    const handleSearch = () => {      
      const search = searchRef?.current?.value;
      
      if(search){
       
        const filterUser = users.filter((user) => {
          return user.name.toLowerCase().includes(search.toLowerCase());
        });

        setDisplayUsers(filterUser)
      }else{
        setDisplayUsers(users)
      }
    }


  return (
    <>
    <Header />
      <div className='min-h-screen pl-10 pr-10'>
        <div className='flex justify-center p-8'>
          <div className="flex items-center w-full max-w-lg">
            <input
              ref={searchRef} 
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2"
            />
            <button 
              onClick={handleSearch} 
              className="bg-slate-600 px-4 py-2 text-white font-semibold rounded-r-md transition duration-300 ease-in-out"
            >
              Search
            </button>
          </div>
        </div>

        <div className='flex gap-10 mt-10 flex-wrap'>
          {displayUsers?.length > 0 ? (
            displayUsers.map((user, index) => (
              <div key={index} className="max-w-sm w-80 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center px-6 py-4">
                  {/* Profile Image */}
                  <img 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                  src={user?.imageURL != "none" ? user?.imageURL : profilePic}
                  alt="Profile" 
                />
                 

                  {/* User Info */}
                  <div className="flex-grow">
                    <h3 className="text-gray-900 font-semibold text-lg capitalize">{user?.name}</h3>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="px-6 py-4 flex justify-between border-t border-gray-200">
                  <button 
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    <Link to={`/admin/editUser/${user._id}`}>Edit</Link>
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No users found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard