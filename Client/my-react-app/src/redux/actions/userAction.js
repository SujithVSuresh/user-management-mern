import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL,
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
    USER_LOGOUT,
    USER_PROFILE_EDIT_REQUEST, USER_PROFILE_EDIT_SUCCESS, USER_PROFILE_EDIT_FAIL,
    USER_PROFILE_RESET,
 } from "../constants/userConstants"
import axios from "axios"
import Cookies from "js-cookie"
import axiosInstance from "../../api/axiosInstance"




export const signup = (name, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_SIGNUP_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(
            'http://localhost:3000/signup',
            {'name':name, 'email':email, 'password':password},
            config
        )


        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload: data.user
        }) 

    }catch(error){
        dispatch({
            type:USER_SIGNUP_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const signin = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_SIGNIN_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(
            'http://localhost:3000/signin',
            {'email':email, 'password':password},
            config
        )


        Cookies.set("accessToken", data.jwtToken, {
            path: "/",
            sameSite: "None",
            secure: true,
        });

        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload: data.jwtToken
        }) 
    }catch(error){
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload:error.response && error.response.data.message
        })
        console.log(error, "error")
    }
}


export const profile = () => async (dispatch, getState) => {
    try{

        dispatch({
            type: USER_PROFILE_REQUEST
        })        

    //     const token = getState().userSignin.token

    //     const config = {
    //         headers:{
    //             'Content-type':'application/json',
    //             Authorization: `Bearer ${token}`
    //         }
    //     }

    // const {data} = await axios.get(
    //     'http://localhost:3000/profile',
    //     config
    // )

    const {data} = await axiosInstance.get(
        `/profile`,
        {userType: 'user'}
    )

    
    dispatch({
        type:USER_PROFILE_SUCCESS,
        payload: data?.userData
    }) 

    }catch(error){
        console.log(error.response)
        dispatch({
            type:USER_PROFILE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const logout = () => async (dispatch, getState) => {
    try{
        const config = {
            headers:{
                'Content-type':'application/json',
            }
        }
        
    const {status} = await axios.get(
        'http://localhost:3000/logout',
        config
    )

    if(status == 200){
        Cookies.remove("accessToken", {
            path: "/",
            sameSite: "None",
            secure: true,
        });
        dispatch({
            type:USER_LOGOUT,
        }) 
        dispatch({
            type: USER_PROFILE_RESET
        })
    }
    }catch(error){
        console.log("Error logging out", error)
    }
}


export const editProfile = (updateData) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type: USER_PROFILE_EDIT_REQUEST
        })
        // const token = getState().userSignin.token

        // const config = {
        //     headers:{
        //         'Content-type':'application/json',
        //         Authorization: `Bearer ${token}`
        //     }
        // }

         
        
        // const {data} = await axios.post(
        //     'http://localhost:3000/edit-profile',
        //     {
        //         "userId": updateData.userId,
        //         "name": updateData.name,
        //         "email": updateData.email,
        //         "imageURL": updateData.imageURL
        //     },
        //     config
        // )

        const {data} = await axiosInstance.post(
            `/edit-profile`,
            {
                "userId": updateData.userId,
                "name": updateData.name,
                "email": updateData.email,
                "imageURL": updateData.imageURL
            },
            {userType: 'user'}
        )
    
        
        dispatch({
            type:USER_PROFILE_EDIT_SUCCESS,
            payload: data.user
        }) 

        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload: data.user
        }) 

    }catch(error){
        dispatch({
            type:USER_PROFILE_EDIT_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


