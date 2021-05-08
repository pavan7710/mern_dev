import {SET_ALERT , REMOVE_ALERT} from '../actions/constants'


const initialState = []
 const alertReducer = (state= initialState , action ) => {
     //console.log(action)
  //  console.log(state)
   // console.log(action.type)

   const {type , payload} = action

    switch (type) {
        case SET_ALERT:
            return [
                ...state ,
                action.payload
            ]
        case REMOVE_ALERT:
            // console.log(e.id)
           // console.log(action.id)
           // const {payload} = action
            return state.filter(e => e.id !== payload )
        default:
            return state 
    }
}

export default alertReducer