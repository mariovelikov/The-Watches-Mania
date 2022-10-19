import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addProductToFavorites from "../actions/ads/addProductToFavorites";
import removeProductFromFavorites from "../actions/ads/removeProductFromFavorites";


const initialState = {
    ads: [],
    status: 'idle',
    error: null,
    cart: [],
    favStatus: 'idle',
    favorites: [],
    filteredAds: []
}

const ProductsSlice = createSlice({
    name: "ads",
    initialState,
    reducers: {
        addToCart(state, action) {
            if (localStorage.getItem('products')) {
                state.cart = JSON.parse(localStorage.getItem('products'))
                state.cart.push(action.payload)
                localStorage.setItem('products', JSON.stringify(state.cart))
            } else {
                localStorage.setItem('products', JSON.stringify([action.payload]))
            }
        },

        removeFromCart(state, action) {
            if (localStorage.getItem('products')) {
                state.cart = JSON.parse(localStorage.getItem('products'))
                const newData = state.cart.filter(product => product.id !== Number(action.payload))
                state.cart = newData
                localStorage.setItem('products', JSON.stringify(newData))
            }
        },

        loadProductsInCart(state, action) {
            if (localStorage.getItem('products')) {
                state.cart = JSON.parse(localStorage.getItem('products'))
            }
        },

        // when you start page it filters all available filters 
        getFilterItems(state, action) {
            console.log(action.payload);
        },

        addFilteredProducts(state, action) {
            state.filteredAds = []

            for (let product of action.payload) {
                state.filteredAds.push(product)
            }
        }
    },

    extraReducers(builder) {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.ads = action.payload
            })
        builder
            .addCase(postData.pending, (state, action) => {
            })
            .addCase(postData.fulfilled, (state, action) => {
                if (typeof (action.payload) === 'string') {
                    state.error = action.payload
                } else {
                    state.status = 'idle'
                }
            })
        builder
            .addCase(editAd.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(editAd.fulfilled, (state, action) => {
                state.status = 'idle'
            })
        builder
            .addCase(getFavoritesProducts.pending, (state, action) => {
                state.favStatus = 'loading'
            })
            .addCase(getFavoritesProducts.fulfilled, (state, action) => {
                for (let product of action.payload) {
                    state.favorites.push(product)
                }

                state.favStatus = 'fullfilled'
            })
        builder
            .addCase(addProductToFavorites.fulfilled, (state, action) => {
                state.favorites = []

                for (let product of action.payload) {
                    state.favorites.push(product)
                }
                state.status = 'fulfilled'
            })
        builder
            .addCase(removeProductFromFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload
            })
        builder
            .addCase(orderProducts.fulfilled, (state, action) => {
                if ('error' in action.payload) {
                    state.error = action.payload.error
                } else {
                    // clear all products from cart
                    localStorage.setItem('products', JSON.stringify([]))
                }
            })
    }
})










//  ACTIONS
export const fetchData = createAsyncThunk('ads/fetchData', async () => {
    try {
        const response = fetch('http://localhost:8000/api/data/')
        const data = await (await response).json()

        return data
    } catch (e) {
        console.log(e.message);
    }
})

export const editAd = createAsyncThunk('ads/editAd', async (data) => {

    fetch(`http://localhost:8000/api/${data.id}/data/`, {
        method: 'PUT',
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        },

        body: data.data
    })
})


export const postData = createAsyncThunk(
    'ads/postData', async (data) => {
        const response = await fetch('http://localhost:8000/api/data/', {
            method: 'POST',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            },

            body: data
        })

        const res = await response.json()
        return res
    }
)

export const deleteAd = createAsyncThunk(
    'ads/deleteAd', async (id) => {
        try {
            fetch(`http://127.0.0.1:8000/api/${id}/data/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
            })
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const orderProducts = createAsyncThunk(
    'ads/orderProducts', async (data) => {
        try {
            const post = await fetch(`http://127.0.0.1:8000/api/orders/`, {
                method: 'POST',
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const response = await post.json()
            return response
        }
        catch (e) {
            console.log(e);
        }
    }
)

export const getFavoritesProducts = createAsyncThunk(
    'ads/getFavoritesProducts', async () => {
        try {
            const request = await fetch(`http://127.0.0.1:8000/api/favorites/`, {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
            const data = await request.json()

            return data

        } catch (e) {
            throw new Error(e)
        }
    }
)

export const { loadProductsInCart, addToCart, removeFromCart, getFilterItems, addFilteredProducts } = ProductsSlice.actions
export default ProductsSlice.reducer