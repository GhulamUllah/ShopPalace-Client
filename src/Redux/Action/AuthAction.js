import axios from 'axios'
import { User_Loading_False, User_Loading_Attempt, User_Loading_True, User_Login, User_Logout, Change_PassWord, All_Users, Delete_User } from '../Types'
import baseurl from '../../baseurl'
import { Alertapp } from './Alertapp'

export let user_login = (option) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.post(`${baseurl}/user/login`, option)
        if(user.data.message === 'Logged in Successfully'){
            localStorage.setItem('token', user.data.data.token)
        console.log(user)
        dispatch(Alertapp(user.data.success,user.data.message))

        dispatch({ type: User_Login, payload: user.data.data })
        dispatch({ type: User_Loading_True })
        }
        else{
        dispatch(Alertapp(user.data.success,user.data.message))

        }
    } catch (error) {
        console.log(error)
        dispatch({ type: User_Loading_False })
    }
}

export let user_logout = () => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        localStorage.removeItem('token')
        dispatch(Alertapp(true,'Logout Successfully'))
        
        dispatch({ type: User_Logout })
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))
        dispatch({ type: User_Loading_False })
    }
}

export let user_signup = (option) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.post(`${baseurl}/user/sign-up`, option)
        console.log(user)
        dispatch(Alertapp(user.data.success,user.data.message))
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        dispatch({ type: User_Loading_False })
    }
}

export let loaduser = () => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.get(`${baseurl}/user/loaduser`)
        console.log(user)
        dispatch({ type: User_Login, payload: user.data.data })
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch({ type: User_Loading_False })
    }
}


export let allusers = () => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.get(`${baseurl}/user/`)
        console.log(user)
        dispatch({ type: All_Users, payload: user.data.data })
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch({ type: User_Loading_False })
    }
}

export let change_password = (option) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.put(`${baseurl}/user/change-password`, option)
        dispatch(Alertapp(user.data.success,user.data.message))
        
        console.log(user)
        dispatch({ type: Change_PassWord, payload: user.data.data })
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        dispatch({ type: User_Loading_False })
    }
}



export let reset_password = (option) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.post(`${baseurl}/user/reset-password`, option)
        console.log(user)
        dispatch(Alertapp(user.data.success,user.data.message))

        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        dispatch({ type: User_Loading_False })
    }
}


export let reset_password_otp = (option) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.post(`${baseurl}/user/reset-password-otp`, option)
        dispatch(Alertapp(user.data.success,user.data.message))

        console.log(user)
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch({ type: User_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

    }
}

export let become_seller_otp = (option) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.put(`${baseurl}/user/become-seller`, option)
        dispatch(Alertapp(user.data.success,user.data.message))

        console.log(user)
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        dispatch({ type: User_Loading_False })
    }
}


export let getsellerotp = (option) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.put(`${baseurl}/user/become-seller`, option)
        dispatch(Alertapp(user.data.success,user.data.message))

        console.log(user)
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        dispatch({ type: User_Loading_False })
    }
}


export let sentsellerotp = (option) => async (dispatch) => {
    console.log(option)
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.put(`${baseurl}/user/sent-seller-otp`, option)
        dispatch(Alertapp(user.data.success,user.data.message))

        console.log(user)
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        dispatch({ type: User_Loading_False })
    }
}



export let delete_user = (id) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.delete(`${baseurl}/user/delete/${id}`)
        console.log(user)
        dispatch(Alertapp(user.data.success,user.data.message))

        dispatch({ type: Delete_User, payload: id })
        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        dispatch({ type: User_Loading_False })
    }
}


export let update_user = (option) => async (dispatch) => {
    try {
        dispatch({ type: User_Loading_Attempt })
        const user = await axios.put(`${baseurl}/user/update`, option)
        console.log(user)
        dispatch(Alertapp(user.data.success,user.data.message))

        dispatch({ type: User_Loading_True })
    } catch (error) {
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        dispatch({ type: User_Loading_False })
    }
}