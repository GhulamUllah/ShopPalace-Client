import { Add_Product, All_Products, Delete_Product, Edit_Product, Paginate_Products, Product_Loading_Attempt, Product_Loading_False, Product_Loading_True, Search_Product, Single_Products, Sort_Products, User_Products } from "../Types"


const initialState = {
    allproducts: [],
    userproducts: [],
    search: [],
    paginate:[],
    sort:[],
    single: {},
    loading: false
}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case Product_Loading_Attempt:
            return {
                ...state,
                loading: true
            }
        case Product_Loading_True:
            return {
                ...state,
                loading: false
            }
        case Product_Loading_False:
            return {
                ...state,
                loading: false
            }
        case All_Products:
            return {
                ...state,
                allproducts: action.payload
            }
        case User_Products:
            return {
                ...state,
                userproducts: action.payload
            }
        case Sort_Products:
            return {
                ...state,
                sort: action.payload
            }
        case Search_Product:
            return {
                ...state,
                search: action.payload
            }
        case Paginate_Products:
            return {
                ...state,
                paginate: action.payload
            }
        case Single_Products:
            return {
                ...state,
                single: action.payload
            }
        case Delete_Product:
            return {
                ...state,
                allproducts: state.allproducts.filter((p) => p._id !== action.payload),
                userproducts: state.userproducts.filter((p) => p._id !== action.payload)
            }
        case Add_Product:
            return {
                ...state,
                allproducts: [...state.allproducts, action.payload],
                userproducts: [...state.userproducts, action.payload]
            }


        case Edit_Product:
            const allindex = state.allproducts.findIndex((p) => p._id === action.payload._id)
            const userindex = state.userproducts.findIndex((p) => p._id === action.payload._id)
            const all = state.allproducts.splice(allindex, 1, action.payload)
            const user = state.allproducts.splice(userindex, 1, action.payload)
            return {
                ...state,
                allproducts: state.allproducts,
                userproducts: state.userproducts
            }


        default:
            return {
                ...state
            }
    }
}


export default ProductReducer;