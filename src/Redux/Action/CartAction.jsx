import axios from "axios"
import { Add_To_Cart, Cart_Loading_Attempt, Cart_Loading_False, Cart_Loading_True, Decrement, Del_From_Cart, Increment, Load_User_Cart } from "../Types"
import baseurl from '../../baseurl'
import {Alertapp} from './Alertapp'



export let getusercart = () => async (dispatch) => {
    try {
        dispatch({ type: Cart_Loading_Attempt })
        const product = await axios.get(`${baseurl}/cart`)
        console.log(product)
        dispatch({ type: Load_User_Cart, payload: product.data.data })
        dispatch({ type: Cart_Loading_True })

    } catch (error) {
        dispatch({ type: Cart_Loading_False })
        console.log(error)

    }
}



export let addtocart = (id) => async (dispatch) => {
    try {
        dispatch({ type: Cart_Loading_Attempt })
        const product = await axios.post(`${baseurl}/cart/add/${id}`)
        console.log(product)
        dispatch(Alertapp(product.data.success,product.data.message))
        dispatch({ type: Add_To_Cart, payload: product.data.data })
        dispatch({ type: Cart_Loading_True })

    } catch (error) {
        dispatch({ type: Cart_Loading_False })
        dispatch(Alertapp(error.response,error.response))

        console.log(error)

    }
}



export let delfromcart = (id) => async (dispatch) => {
    try {
        dispatch({ type: Cart_Loading_Attempt })
        const product = await axios.delete(`${baseurl}/cart/delete/${id}`)
        console.log(product)
        dispatch(Alertapp(product.data.success,product.data.message))
        dispatch({ type: Del_From_Cart, payload: id })
        dispatch({ type: Cart_Loading_True })

    } catch (error) {
        dispatch({ type: Cart_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        console.log(error)

    }
}



export let inctocart = (id) => async (dispatch) => {
    try {
        dispatch({ type: Cart_Loading_Attempt })
        const product = await axios.post(`${baseurl}/cart/inc/${id}`)
        console.log(product)
        dispatch(Alertapp(product.data.success,product.data.message))

        dispatch({ type: Increment, payload: product.data.data })
        dispatch({ type: Cart_Loading_True })

    } catch (error) {
        dispatch({ type: Cart_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        console.log(error)

    }
}



export let dectocart = (id) => async (dispatch) => {
    try {
        dispatch({ type: Cart_Loading_Attempt })
        const product = await axios.post(`${baseurl}/cart/dec/${id}`)
        dispatch(Alertapp(product.data.success,product.data.message))

        console.log(product)
        dispatch({ type: Decrement, payload: product.data.data })
        dispatch({ type: Cart_Loading_True })

    } catch (error) {
        dispatch({ type: Cart_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        console.log(error)

    }
}





