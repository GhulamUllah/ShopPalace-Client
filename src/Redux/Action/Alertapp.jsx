import { v4 as uuidv4 } from 'uuid'
import { Alert_Off, Alert_On } from '../Types'

export const removealert = (id) => async(dispatch)=>{
    dispatch({type:Alert_Off,payload:id})
}

export let Alertapp = (type, message, id=uuidv4(), time=2000) => async(dispatch)=>{
    try {
        dispatch({type:Alert_On,payload:{type,message,id}})
        setTimeout(() => {
            dispatch(removealert(id))
        }, time);
    } catch (error) {
        console.log(error)
    }
}