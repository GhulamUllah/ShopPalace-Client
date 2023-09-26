import { All_Orders, Create_Order, Delete_Order, Order_Loading_Attempt, Order_Loading_False, Order_Loading_True, Single_Order, Update_Order, User_Orders } from "../Types"



const initialState = {
    allorders: [],
    userorders: [],
    single: {},
    loading: false
}

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Order_Loading_Attempt:
            return {
                ...state,
                loading: true
            }
        case Order_Loading_True:
            return {
                ...state,
                loading: false
            }
        case Order_Loading_False:
            return {
                ...state,
                loading: false
            }
        case Create_Order:
            return {
                ...state,
                userorders: [...state.userorders, action.payload]
            }
        case Delete_Order:
            return {
                ...state,
                allorders: state.allorders?.filter((p) => p._id !== action.payload),
                userorders: state.userorders.filter((p) => p._id !== action.payload)
            }
        case All_Orders:
            return {
                ...state,
                allorders: action.payload

            }
        case User_Orders:
            return {
                ...state,
                userorders: action.payload

            }
        case Single_Order:
            return {
                ...state,
                single: action.payload

            }
        case Update_Order:
            const index = state.userorders.findIndex((p) => p._id === action.payload._id)
            const update = state.userorders.splice(index, 1, action.payload)
            const indexp = state.allorders?.findIndex((p) => p._id === action.payload._id)
            const updatep = state.allorders?.splice(indexp, 1, action.payload)
            return {
                ...state,
                allorders: state.allorders,
                userorders: state.userorders
            }




        default:
            return {
                ...state
            }
    }
}


export default OrderReducer;