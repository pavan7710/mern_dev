import axios from 'axios'
import { setAlert } from './alert'
import {PROFILE_ERROR ,GET_PROFILE , GET_PROFILES, CLEAR_PROFILE} from './constants'



//get current profile 

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type : GET_PROFILE ,
            payload : res.data
        })
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR ,
            payload : {msg : err.response.statusText , status : err.response.status}
        })
        
    }
}


// get all profiles 

export const getProfiles = () => async dispatch => {
    dispatch({type : CLEAR_PROFILE})
    try {

        const res = await axios.get('/api/profile')

        dispatch({
            type : GET_PROFILES,
            payload : res.data
        })
        
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText , status : err.response.status}
        })
    }
}


// Get Profile By Id

export const getProfileById = (userId) => async dispatch => {
    try {

        const res = await axios.get(`/api/profile/user/${userId}`)

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
        
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText , status : err.response.status}
        })
    }
}












// create or Update profile 

export const createProfile = (formData , history , edit= false) => async dispatch => {
    try {
        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }

        const res  = await axios.post('/api/profile' , formData,  config)

        dispatch({
            type : GET_PROFILE , 
            payload : res.data
        })
        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created" , "success"))

        if(!edit){
            console.log(!edit)
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg , "danger")))
        }
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText , status : err.response.status}
        })
    }
}