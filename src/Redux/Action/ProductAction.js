import axios from "axios"
import { Add_Product, All_Products, Delete_Product, Edit_Product, Paginate_Products, Product_Loading_Attempt, Product_Loading_False, Product_Loading_True, Search_Product, Single_Products, Sort_Products, User_Products } from "../Types"
import baseurl from '../../baseurl'
import {Alertapp} from './Alertapp'


export let loadallproducts = () => async (dispatch) => {
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.get(`${baseurl}/product/`)
        console.log(product)
        dispatch({ type: All_Products, payload: product.data.data })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        console.log(error)

    }
}

export let loaduserproducts = () => async (dispatch) => {
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.get(`${baseurl}/product/user-product`)
        console.log(product)
        dispatch({ type: User_Products, payload: product.data.data })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        console.log(error)

    }
}


export let deleteproduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.delete(`${baseurl}/product/delete-product/${id}`)
        dispatch(Alertapp(product.data.success,product.data.message))

        console.log(product)
        dispatch({ type: Delete_Product, payload: id })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        console.log(error)

    }
}

export let getsingleproduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.get(`${baseurl}/product/single-product/${id}`)
        console.log(product)
        dispatch({ type: Single_Products, payload: product.data.data })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        console.log(error)

    }
}


export let update_product = (option, id) => async (dispatch) => {
    console.log(option, id)
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.put(`${baseurl}/product/update-product/${id}`, option)
        console.log(product)
        dispatch(Alertapp(product.data.success,product.data.message))

        dispatch({ type: Edit_Product, payload: product.data.data })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        console.log(error)

    }
}

export let add_product = (option) => async (dispatch) => {
    console.log(option)
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.post(`${baseurl}/product/add-product`, option)
        console.log(product)
        dispatch(Alertapp(product.data.success,product.data.message))

        dispatch({ type: Add_Product, payload: product.data.data })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        console.log(error)

    }
}

export let search_Product = (option) => async (dispatch) => {
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.post(`${baseurl}/product/search`, option)
        console.log(product)
        
        dispatch(Alertapp(product.data.success,product.data.message))

        
        dispatch({ type: Search_Product, payload: product.data.data })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        console.log(error)

    }
}

export let paginate_Product = (option) => async (dispatch) => {
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.post(`${baseurl}/product/pagination`, option)
        console.log(product)
        dispatch({ type: Paginate_Products, payload: product.data })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        console.log(error)

    }
}

export let sort_Product = (option) => async (dispatch) => {
    try {
        dispatch({ type: Product_Loading_Attempt })
        const product = await axios.post(`${baseurl}/product/sort`, option)
        console.log(product)
        dispatch(Alertapp(true,"Sorted by" + option.sort))

        dispatch({ type: Sort_Products, payload: product.data.data })
        dispatch({ type: Product_Loading_True })

    } catch (error) {
        dispatch({ type: Product_Loading_False })
        dispatch(Alertapp(error.response.data.success,error.response.data.message))

        console.log(error)

    }
}