import {REGISTER_SUCCESS, 
        REGISTER_FAIL,
        USER_LOADED,
        AUTH_ERROR,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOG_OUT
} from '../actions/constants'

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null, 
    loading : true,
    user : null 
}

const authReducer =(state=initialState , action)=> {
   const {type , payload} = action 
   // console.log(type)
    switch(type){
        case USER_LOADED : 
            return {
                ...state,
                isAuthenticated:true,
                loading : false ,
                user : payload
            }
        case REGISTER_SUCCESS:
         case LOGIN_SUCCESS:
            localStorage.setItem('token' ,payload.token)       // if register Success we set the token
            return{
                ...state,
                ...payload,
                isAuthenticated : true,
                loading : false 
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOG_OUT: 
            localStorage.removeItem('token')
            return{
                ...state,
                token : null,
                isAuthenticated: false,
                loading : false
            }
        default:
            return state
    }
}

export default authReducer 