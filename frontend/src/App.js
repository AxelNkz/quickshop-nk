import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import ProductScreen from './screen/ProductScreen';
import HomeScreen from './screen/HomeScreen';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import {useSelector} from 'react-redux'
import RegisterScreen from './screen/RegisterScreen';
import ProductsScreen from './screen/ProductsScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import ProfileScreen from './screen/profileScreen';
import OrdersScreen from './screen/OrdersScreen';

function App() {

  const userSignin = useSelector(state=>state.userSignin)
  const {userInfo} = userSignin
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
              <header className="header">
                  <div className="brand">
                      <button onClick={openMenu}>
                        &#9776;  
                      </button>
                      <Link to="/" >Quickshop</Link>
                  </div>
                  <div className="header-links">
                      
                      <Link to="/cart">
                        Cart
                        {cartItems.length > 0 && (
                          <span className="badge">{cartItems.length}</span>
                        )}
                      </Link>
                      {
                        userInfo ? <Link to='/profile'>{userInfo.name}</Link>:
                        <Link to="/signin" >Sign In</Link>
                      }
                      {userInfo && userInfo.isAdmin && (
                         <div className="dropdown">
                            <a href="#">Admin</a>
                            <ul className="dropdown-content">
                              <li>
                              <Link to="/orders" >Orders</Link>
                              <Link to="/products" >Products</Link>
                              </li>
                            </ul>
                          </div>
                      )}
                      
                  </div>
              </header>
              <aside className="sidebar">
                  <h3>Shopping Categories</h3>
                  <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                  <ul className="categories">
                      <li>
                          <Link to="/category/Pants"> Pants</Link>
                      </li>
                      <li>
                          <Link to="/category/Shirts"> Shirts</Link>
                      </li>
                  </ul>
              </aside>
              <main className="main">
                  <div className="content">
                      <Route path="/orders" component={OrdersScreen} />
                      <Route path="/profile" component={ProfileScreen} />
                      <Route path="/order/:id" component={OrderScreen} />
                      <Route path="/signin" component={SigninScreen} />
                      <Route path="/shipping" component={ShippingScreen} />
                      <Route path="/payment" component={PaymentScreen} />
                      <Route path="/placeorder" component={PlaceOrderScreen} />
                      <Route path="/register" component={RegisterScreen} />
                      <Route path="/products" component={ProductsScreen} />
                      <Route path="/product/:id" component={ProductScreen} />
                      <Route path="/cart/:id?" component={CartScreen} />
                      <Route path="/category/:id" component={HomeScreen} />
                      <Route path="/" exact={true} component={HomeScreen} />

                      
                  </div>
              </main>
              <footer className="footer">
                  All right reserved.
              </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
