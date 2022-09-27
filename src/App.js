import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import SingleAd from './components/ProductDetails';
import PostAd from './components/PostAd';
import ErrorPage from './components/ErrorPage';
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ResetPasswordConfirm from './components/auth/ResetPasswordConfirm';
import ResetPassword from './components/auth/ResetPassword';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Order from './components/Order';
import FavProducts from './components/FavProducts';
import StartPage from './components/HomePage';

import { getFavoritesProducts } from './store/reducers/productsSlice'

import { useLayoutEffect, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from './store/reducers/productsSlice'
import checkToken from "./store/actions/auth/checkToken"
import loadUser from "./store/actions/auth/loadUser"

// import EditAd from './components/EditAd';


function App() {
  const data = useSelector(state => state.ads)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const accessToken = useSelector(state => state.auth.access)

  useLayoutEffect(() => {
    if (data.status === 'idle') {
      dispatch(fetchData())
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkToken())
      dispatch(loadUser())
    } else {
      if (data.favStatus === 'idle') {
        dispatch(getFavoritesProducts())
      }
    }
  }, [isAuthenticated, accessToken])


  // if u click outside automaticly close - filter, search, menu
  document.onclick = (e) => {
    if (!e.target.className.includes('filter') && !e.target.className.includes('open-menu') && !e.target.className.includes('search-icon') && !e.target.className.includes('search-input') && !e.target.className.includes('filter')) {
      document.querySelector('.app-header').className = 'app-header'
      document.querySelector('.container').className = 'container'
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage />} />

        <Route path="/products" element={<LandingPage />} />
        <Route path="/:id/details" element={<SingleAd />} />
        <Route path="/post" element={<PostAd />} />
        {/* <Route path="/:id/details/edit" element={<EditAd />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/favorites" element={<FavProducts />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
