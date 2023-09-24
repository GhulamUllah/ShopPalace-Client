import { Add_To_Cart, Cart_Loading_Attempt, Cart_Loading_False, Cart_Loading_True, Decrement, Del_From_Cart, Increment, Load_User_Cart } from "../Types";



const initialState = {
    cart: [],
    loading: false
}


const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case Cart_Loading_Attempt:
            return {
                ...state,
                loading: true
            }
        case Cart_Loading_True:
            return {
                ...state,
                loading: false
            }
        case Cart_Loading_False:
            return {
                ...state,
                loading: false
            }
        case Load_User_Cart:
            return {
                ...state,
                cart: action.payload
            }
        case Add_To_Cart:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case Increment:
            const index = state.cart.findIndex((p) => p._id === action.payload._id)
            const update = state.cart.splice(index, 1, action.payload)
            return {
                ...state,
                cart: state.cart
            }

        case Decrement:
            const indexp = state.cart.findIndex((p) => p._id === action.payload._id)
            const updatep = state.cart.splice(indexp, 1, action.payload)
            return {
                ...state,
                cart: state.cart
            }
        case Del_From_Cart:

            return {
                ...state,
                cart: state.cart.filter((p) => p._id !== action.payload)
            }


        default:
            return {
                ...state
            }
    }
}


export default CartReducer;