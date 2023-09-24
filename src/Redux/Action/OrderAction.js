import { All_Orders, Create_Order, Delete_Order, Order_Loading_Attempt, Order_Loading_False, Order_Loading_True, Single_Order, Update_Order, User_Orders } from "../Types"
import axios from 'axios'
import baseurl from '../../baseurl'
import {Alertapp} from './Alertapp'

export let getallorders = () => async (dispatch) => {
    try {
        dispatch({ type: Order_Loading_Attempt })
        const order = await axios.get(`${baseurl}/order`)
        console.log(order)
        dispatch({ type: All_Orders, payload: order.data.data })
    } catch (error) {
        dispatch({ type: Order_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))
        console.log(error)
    }
}


export let getuserorders = () => async (dispatch) => {
    try {
        dispatch({ type: Order_Loading_Attempt })
        const order = await axios.get(`${baseurl}/order/user`)
        console.log(order)
        dispatch({ type: User_Orders, payload: order.data.data })
    } catch (error) {
        dispatch({ type: Order_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))
        console.log(error)
    }
}

export let getsingleorder = (id) => async (dispatch) => {
    try {
        dispatch({ type: Order_Loading_Attempt })
        const order = await axios.get(`${baseurl}/order/single/${id}`)
        console.log(order)
        dispatch({ type: Single_Order, payload: order.data.data })
    } catch (error) {
        dispatch({ type: Order_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))
        console.log(error)
    }
}


export let createorder = (option) => async (dispatch) => {
    try {
        dispatch({ type: Order_Loading_Attempt })
        const order = await axios.post(`${baseurl}/order/add`, option)
        dispatch(Alertapp(order.data.success,order.data.message))

        console.log(order)
        dispatch({ type: Create_Order, payload: order.data.data })
    } catch (error) {
        dispatch({ type: Order_Loading_False })
        console.log(error)
        dispatch(Alertapp(error.response.data.success,error.response.data.message))
    }
}


export let deleteorder = (id) => async (dispatch) => {
    try {
        dispatch({ type: Order_Loading_Attempt })
        const order = await axios.delete(`${baseurl}/order/delete/${id}`)
        console.log(order)
        dispatch(Alertapp(order.data.success,order.data.message))
        dispatch({ type: Delete_Order, payload: id })
    } catch (error) {
        dispatch({ type: Order_Loading_False })
        console.log(error)
        dispatch(Alertapp(error.response.data.success,error.response.data.message))
    }
}


export let updateorder = (id, option) => async (dispatch) => {
    try {
        dispatch({ type: Order_Loading_Attempt })
        const order = await axios.put(`${baseurl}/order/update/${id}`, option)
        console.log(order)
        dispatch(Alertapp(order.data.success,order.data.message))
        dispatch({ type: Update_Order, payload: order.data.data })
    } catch (error) {
        dispatch({ type: Order_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))
        console.log(error)
    }
}


export let updatepayment = (id) => async (dispatch) => {
    try {
        dispatch({ type: Order_Loading_Attempt })
        const order = await axios.put(`${baseurl}/order/update-payment/${id}`)
        console.log(order)
        dispatch(Alertapp(order.data.success,order.data.message))
        dispatch({ type: Update_Order, payload: order.data.data })
    } catch (error) {
        dispatch({ type: Order_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))
        console.log(error)
    }
}