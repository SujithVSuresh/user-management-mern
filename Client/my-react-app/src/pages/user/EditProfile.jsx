import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from '../../components/user/Header';
import Footer from '../../components/user/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { profile } from '../../redux/actions/userAction';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { editProfile } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import upload from '../../assets/upload.png'
import { USER_PROFILE_EDIT_RESET, USER_PROFILE_EDIT_REQUEST } from '../../redux/constants/userConstants';


const EditProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('')
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState({});

  const { userData } = useSelector(state => state.userProfile)
  const { user, loading } = useSelector(state => state.userProfileEdit)


  useEffect(() => {
    setName(userData && userData?.name)
    setEmail(userData && userData?.email)
    setUserId(userData && userData?._id)
    setImageUrl(userData && userData?.imageURL)
  }, [userData])

  useEffect(() => {
    !userData && dispatch(profile())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch({
        type: USER_PROFILE_EDIT_RESET
      })
      navigate('/')
    }

  }, [user])


  let isValid = true
  const validate = () => {
    const error = {}

    const nameRegex = /^[a-zA-Z]{3,}(?: [a-zA-Z]{3,})*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      error.name = "This field is required"
      isValid = false
    } else if (!nameRegex.test(name)) {
      error.name = "Enter a valid name"
      isValid = false
    }

    if (!email) {
      error.email = "This field is required"
      isValid = false
    } else if (!emailRegex.test(email)) {
      error.email = "Enter a valid email"
      isValid = false
    }
    
    if(!imageUrl){
      error.image = "Image is required"
      isValid = false
    }

    return error
  }

  const handleUpload = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setError(validate())

    if(isValid){
    try {
      let downloadURL = '';
      if (imageFile) {
        dispatch({
          type: USER_PROFILE_EDIT_REQUEST
        })
        const imageRef = ref(storage, `profile-images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        downloadURL = await getDownloadURL(imageRef);
      }

      const updatedData = {
        name,
        email,
        imageURL: downloadURL || imageUrl,
        userId
      };

      dispatch(editProfile(updatedData))
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error updating profile');
    }
  }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center">Edit Profile</h2>
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
                required
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
                required
              />
              <p className='text-red-500 text-xs mt-1'>{error?.email}</p>
            </div>

            <div className='flex flex-col items-center'>
              <input type="file" id='fileInput' className='hidden' accept="image/*" onChange={handleUpload} />
              <label htmlFor="fileInput" className='bg-slate-300 w-full h-28 rounded flex justify-center items-center'>
                <img src={upload} alt="" className='w-10 h-10' />
              </label>
              <p className='text-red-500 text-xs mt-1'>{error?.image}</p>
              {imageUrl && <img src={imageUrl} alt="Image Preview" style={{ width: '200px', height: 'auto' }} />}
            </div>

            

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-slate-700 rounded focus:ring-opacity-50"
              >
                {loading ? ". . ." : "Submit"}
              </button>
            </div>
          </form>


        </div>
      </div>
      <Footer />
    </>
  )
}

export default EditProfile