import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userSignupReducers, userSigninReducers, userProfileReducers, userProfileEditReducers } from "./reducers/userReducer";
import { adminSigninReducers, adminUsersReducers, adminAddUserReducers, adminEditUserReducers, userCount } from "./reducers/adminReducer";


const reducer = combineReducers({
    // User
    userSignup: userSignupReducers,
    userSignin: userSigninReducers,
    userProfile: userProfileReducers,
    userProfileEdit: userProfileEditReducers,    
    
    // Admin
    adminSignin: adminSigninReducers,
    adminUsers: adminUsersReducers,
    adminAddUser: adminAddUserReducers,
    adminEditUser: adminEditUserReducers,
    userCount: userCount

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk]

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)))

export default store;