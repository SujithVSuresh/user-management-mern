import { ADMIN_SIGNIN_REQUEST, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_LOGOUT, 
    ADMIN_USERS_FETCH_REQUEST, ADMIN_USERS_FETCH_SUCCESS, ADMIN_USERS_FETCH_FAIL, ADMIN_USERS_FETCH_RESET,
    ADMIN_USERS_DELETE_REQUEST, ADMIN_USERS_DELETE_SUCCESS, ADMIN_USERS_DELETE_FAIL,
    ADMIN_ADD_USER_REQUEST, ADMIN_ADD_USER_SUCCESS, ADMIN_ADD_USER_FAIL, ADMIN_ADD_USER_RESET,
    ADMIN_EDIT_USER_REQUEST, ADMIN_EDIT_USER_SUCCESS, ADMIN_EDIT_USER_FAIL, ADMIN_EDIT_USER_RESET, 
    USER_COUNT_INCREMENT, USER_COUNT_DECREMENT, USER_COUNT
 } from "../constants/adminConstants"




export const adminSigninReducers = (state = {loading: false, error: '', adminToken: null}, action) => {
    switch(action.type){
        case ADMIN_SIGNIN_REQUEST:
            return {
                ...state,
                loading:true
            }

        case ADMIN_SIGNIN_SUCCESS:
            return {
                ...state,
                loading:false,
                adminToken: action.payload
            }  
            
        case ADMIN_SIGNIN_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            }  
            
        case ADMIN_LOGOUT:
            return{
                loading: false,
                error: '',
                adminToken: null
            }
            
        default:
            return state    
    }
}


export const adminUsersReducers = (state = {loading: false, error: '', users: null}, action) => {
    switch(action.type){
        case ADMIN_USERS_FETCH_REQUEST:
            return {
                ...state,
                loading:true
            }

        case ADMIN_USERS_FETCH_SUCCESS:
            return {
                ...state,
                loading:false,
                users: action.payload
            }  
            
        case ADMIN_USERS_FETCH_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            }  

        case ADMIN_USERS_FETCH_RESET:
            return {
                ...state,
                loading: false,
                error: '',
                users: null
            }
            
        default:
            return state    
    }
}


export const adminUserDeleteReducers = (state = {loading: false, error: '', status: null}, action) => {
    switch(action.type){
        case ADMIN_USERS_DELETE_REQUEST:
            return {
                ...state,
                loading:true
            }

        case ADMIN_USERS_DELETE_SUCCESS:
            return {
                ...state,
                loading:false,
                status: action.payload
            }  
            
        case ADMIN_USERS_DELETE_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            }  
            
        default:
            return state    
    }
}


export const adminAddUserReducers = (state = {loading: false, error: '', user: null}, action) => {
    switch(action.type){
        case ADMIN_ADD_USER_REQUEST:
            return {
                ...state,
                loading:true
            }

        case ADMIN_ADD_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                user: action.payload
            }  
            
        case ADMIN_ADD_USER_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            }  

        case ADMIN_ADD_USER_RESET:
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


export const adminEditUserReducers = (state = {loading: false, error: '', user: null}, action) => {
    switch(action.type){
        case ADMIN_EDIT_USER_REQUEST:
            return {
                ...state,
                loading:true
            }

        case ADMIN_EDIT_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                user: action.payload
            }  
            
        case ADMIN_EDIT_USER_FAIL:
            return {
                ...state,
                loading:false, 
                error:action.payload
            }  

        case ADMIN_EDIT_USER_RESET:
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


export const userCount = (state={count: 0}, action) => {
    switch (action.type) {
        case USER_COUNT:
            return {
                ...state,
                count: action.payload
            }
        case USER_COUNT_INCREMENT:
            return {
                ...state, 
                count: state.count + 1
            }

        case USER_COUNT_DECREMENT:
            return{
                ...state,
                count: state.count - 1
            }    
            
        default:
            return state
    }
}