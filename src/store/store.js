import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ProductsSlice from './reducers/productsSlice'
import AuthSlice from './reducers/authSlice'


const root = combineReducers({
    ads: ProductsSlice,
    auth: AuthSlice
})

const store = configureStore({
    reducer: root
})

export default store