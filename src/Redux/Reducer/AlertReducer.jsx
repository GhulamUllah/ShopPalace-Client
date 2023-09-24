import { Alert_Off, Alert_On } from "../Types"

const initialState = {
    alert:[]
    
}


const AlertReducer = (state = initialState, action) =>{
    switch (action.type) {
        case Alert_On:
            return {
                ...state,
                alert:[...state.alert,action.payload]
            }
        case Alert_Off:
            return {
                ...state,
                alert:state.alert.filter((p)=>p.id !== action.payload)
            }
            
            
    
        default:
            return{
                ...state
            }
    }

}


export default AlertReducer