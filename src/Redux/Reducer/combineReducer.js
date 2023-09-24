import { combineReducers } from 'redux'
import { AuthReducer } from './AuthReducer';
import ProductReducer from './ProductReducer';
import CartReducer from './CartReducer';
import OrderReducer from './OrderReducer';
import AlertReducer from './AlertReducer';


const Reducer = combineReducers({
    Auth: AuthReducer,
    Product: ProductReducer,
    Cart: CartReducer,
    Order: OrderReducer,
    Alert:AlertReducer,
})


//Exports
export default Reducer;