import { useEffect } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import SetAxiosToken from './Redux/SetAxiosToken';
import { useDispatch } from 'react-redux';
import { loaduser } from './Redux/Action/AuthAction';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Userdashboard from './Components/Dashboard/Userdashboard';
import UserList from './Admin/UserList';
import { loadallproducts, loaduserproducts } from './Redux/Action/ProductAction';
import ProductList from './Admin/Productlist';
import Product from './Components/Home/Product';
import { getusercart } from './Redux/Action/CartAction';
import Cart from './Components/Cart/Cart';
import StripeCheckout from './Components/Cart/StripeCheckout';
import { getallorders, getuserorders } from './Redux/Action/OrderAction';
import Success from './Components/Order/Success';
import Cancel from './Components/Order/Cancel';
import OrderList from './Admin/OrderList';
import Homepage from './Components/Home/Homepage';
import FAQs from './Components/Home/FAQs';
import Pagination from './Components/Home/Pagination';
import Alertpop from './Components/AlertLayout/Alertpop';

function App() {
  SetAxiosToken(localStorage.token)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loaduser())
    dispatch(loaduserproducts())
    dispatch(loadallproducts())
    dispatch(getallorders())
    dispatch(getuserorders())
    dispatch(getusercart())
    dispatch(getallorders())
  }, [dispatch])
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Alertpop/>
        <Routes>
          <Route path='/Dashboard' element={<Userdashboard />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/Admin/userlist' element={<UserList />} />
          <Route path='/Admin/productlist' element={<ProductList />} />
          <Route path='/Admin/orderlist' element={<OrderList />} />
          <Route path='/paginate' element={<Pagination />} />
          <Route path='/Product' element={<Product />} />
          <Route path='/stripe-checkout' element={<StripeCheckout />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/FAQs' element={<FAQs />} />
          <Route path='/Success' element={<Success />} />
          <Route path='/Cancel' element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
