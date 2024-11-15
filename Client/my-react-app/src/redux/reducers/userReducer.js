import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_RESET,
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_RESET, USER_LOGOUT,
    USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_RESET,
    USER_PROFILE_EDIT_REQUEST, USER_PROFILE_EDIT_SUCCESS, USER_PROFILE_EDIT_FAIL, USER_PROFILE_EDIT_RESET
 } from "../constants/userConstants"


export const userSignupReducers = (state = {loading: false, error: '', user:null}, action) => {
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {
                ...state,
                loading:true
            }

        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                loading:false,
                user: action.payload
            }  
            
        case USER_SIGNUP_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            }  
            
        case USER_SIGNUP_RESET:
            return{
                ...state,
                loading: false, 
                error: '', 
                user:null
            }
            
        default:
            return state    
    }
}

export const userSigninReducers = (state = {loading: false, error: '', token: null, email: null}, action) => {
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {
                ...state,
                loading:true
            }

        case USER_SIGNIN_SUCCESS:
            return {
                ...state,
                loading:false,
                token: action.payload
            }  
            
        case USER_SIGNIN_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            }  
            
        case USER_LOGOUT:
            return{
                loading: false,
                error: '',
                token: null
            }
        case USER_SIGNIN_RESET:
            return{
                ...state,
                loading: false, 
                error: '', 
                status:null
            } 
        default:
            return state    
    }
}


export const userProfileReducers = (state = {loading: false, error: '', userData: null}, action) => {
    switch(action.type){
        case USER_PROFILE_REQUEST:
            return {
                ...state,
                loading:true
            }

        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading:false,
                userData: action.payload
            }  
            
        case USER_PROFILE_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            } 
        case USER_PROFILE_RESET:
            return {
                ...state,
                loading: false, 
                error: '', 
                userData: null
            } 
            
        default:
            return state    
    }
}


export const userProfileEditReducers = (state = {loading: false, error: '', user: null}, action) => {
    switch(action.type){
        case USER_PROFILE_EDIT_REQUEST:
            return {
                ...state,
                loading:true
            }

        case USER_PROFILE_EDIT_SUCCESS:
            return {
                ...state,
                loading:false,
                user: action.payload
            }  
            
        case USER_PROFILE_EDIT_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            }  

        case USER_PROFILE_EDIT_RESET:
            return {
                ...state,
                loading: false,
                error: '',
                user: null
            }
            
        default:
            return state    
    }
}

