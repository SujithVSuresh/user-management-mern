import axios from "axios"
import { ADMIN_SIGNIN_REQUEST, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNIN_FAIL,ADMIN_LOGOUT,
    ADMIN_USERS_FETCH_REQUEST, ADMIN_USERS_FETCH_SUCCESS, ADMIN_USERS_FETCH_FAIL, ADMIN_USERS_FETCH_RESET,
    ADMIN_USERS_DELETE_REQUEST, ADMIN_USERS_DELETE_SUCCESS, ADMIN_USERS_DELETE_FAIL,
    ADMIN_ADD_USER_REQUEST, ADMIN_ADD_USER_SUCCESS, ADMIN_ADD_USER_FAIL,
    ADMIN_EDIT_USER_REQUEST, ADMIN_EDIT_USER_SUCCESS, ADMIN_EDIT_USER_FAIL, ADMIN_EDIT_USER_RESET,
    USER_COUNT, USER_COUNT_INCREMENT, USER_COUNT_DECREMENT

 } from "../constants/adminConstants"
import Cookies from "js-cookie"
import axiosInstance from "../../api/axiosInstance"



export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: ADMIN_SIGNIN_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(
            'http://localhost:3000/admin/login',
            {'email':email, 'password':password},
            config
        )

        Cookies.set("adminAccessToken", data.jwtToken, {
            path: "/",
            sameSite: "None",
            secure: true,
        });

        dispatch({
            type:ADMIN_SIGNIN_SUCCESS,
            payload: data.jwtToken
        }) 

    }catch(error){
        dispatch({
            type:ADMIN_SIGNIN_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}


export const addUser = (name, email, password) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ADMIN_ADD_USER_REQUEST
        })
        // const token = getState().adminSignin.adminToken
        const users = getState().adminUsers.users
        

        // const config = {
        //     headers:{
        //         'Content-type':'application/json',
        //         Authorization: `Bearer ${token}`
        //     }
        // }
        // const {data} = await axios.post(
        //     'http://localhost:3000/admin/add-user',
        //     {'name': name, 'email':email, 'password':password},
        //     config
        // )     
        
        const {data} = await axiosInstance.post(
            `/admin/add-user`,
            {'name': name, 'email':email, 'password':password},
            {userType: 'admin'}
        )


        dispatch({
            type:ADMIN_ADD_USER_SUCCESS,
            payload: data?.data
        }) 

        dispatch({
            type:ADMIN_USERS_FETCH_SUCCESS,
            payload: [...users, data?.data]
        }) 

        dispatch({
            type: USER_COUNT_INCREMENT
        })

    }catch(error){
        dispatch({
            type:ADMIN_ADD_USER_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}



export const editUser = (name, email, userId) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ADMIN_EDIT_USER_REQUEST
        })
        // const token = getState().adminSignin.adminToken
        const users = getState().adminUsers.users
        

        // const config = {
        //     headers:{
        //         'Content-type':'application/json',
        //         Authorization: `Bearer ${token}`
        //     }
        // }
        // const {data} = await axios.patch(
        //     `http://localhost:3000/admin/edit-user/${userId}`,
        //     {'name': name, 'email':email},
        //     config
        // )       

        const {data} = await axiosInstance.patch(
            `/admin/edit-user/${userId}`,
            {'name': name, 'email':email}, 
            {userType: 'admin'}
        )

        

        dispatch({
            type:ADMIN_EDIT_USER_SUCCESS,
            payload: data?.user
        }) 

        console.log(data.user, "updated user....")

        if(users){
        const updatedUsers = users.map((user) => {
            if(user._id == userId){
                return data?.user
            }else{
                return user
            }
        })

        console.log("ttt", updatedUsers)

        dispatch({
            type:ADMIN_USERS_FETCH_SUCCESS,
            payload: [...updatedUsers]
        }) 
    }

    }catch(error){
        dispatch({
            type:ADMIN_EDIT_USER_FAIL,
            payload:error.response && error.response.data.message
        })
        console.log(error.response.data.message, "error")
    }
}


export const fetchUsers = () => async (dispatch, getState) => {
    try{

        dispatch({
            type: ADMIN_USERS_FETCH_REQUEST
        })

    //     const token = null        

    //     const config = {
    //         headers:{
    //             'Content-type':'application/json',
    //             Authorization: `Bearer ${token}`
    //         }
    //     }

    // const {data} = await axios.get(
    //     'http://localhost:3000/admin/fetch-users',
    //     config
    // )

    const {data} = await axiosInstance.get('/admin/fetch-users', {userType: 'admin'})
    
    dispatch({
        type:ADMIN_USERS_FETCH_SUCCESS,
        payload: data?.users
    }) 

    dispatch({
        type: USER_COUNT,
        payload: data?.users.length
    })

    }catch(error){
        dispatch({
            type:ADMIN_USERS_FETCH_FAIL,
            payload:error.response && error.response.data
            
        })
        console.log(error, "errooo....")
    }
}


export const deleteUser = (userId) => async (dispatch, getState) => {
    try{

        dispatch({
            type: ADMIN_USERS_DELETE_REQUEST
        })

    //     const token = getState().adminSignin.adminToken
        

    //     const config = {
    //         headers:{
    //             'Content-type':'application/json',
    //             Authorization: `Bearer ${token}`
    //         }
    //     }

    // const {status} = await axios.delete(
    //     `http://localhost:3000/admin/delete-user/${userId}`,
    //     config
    // )

    const {status} = await axiosInstance.delete(`/admin/delete-user/${userId}`, {userType: 'admin'})

    
    dispatch({
        type:ADMIN_USERS_DELETE_SUCCESS,
        payload: status
    }) 

    if(status == 200){
        const users = getState().adminUsers.users
        const filteredUsers = users.filter((user) => {
            if(user._id != userId){
                return user
            }
        })
        dispatch({
            type:ADMIN_USERS_FETCH_SUCCESS,
            payload: filteredUsers
        }) 

        dispatch({
            type: USER_COUNT_DECREMENT
        })
    }

    }catch(error){
        dispatch({
            type:ADMIN_USERS_DELETE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const logoutAdmin = () => async (dispatch, getState) => {
    try{
        const token = getState().adminSignin.adminToken

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    const {status} = await axios.get(
        'http://localhost:3000/admin/logout',
        config
    )

    if(status == 200){
        Cookies.remove("adminAccessToken", {
            path: "/",
            sameSite: "None",
            secure: true,
        });
        dispatch({
            type:ADMIN_LOGOUT,
        }) 

        dispatch({
            type: ADMIN_USERS_FETCH_RESET
        })
    }
    }catch(error){
        console.log("Error logging out", error)
    }
}