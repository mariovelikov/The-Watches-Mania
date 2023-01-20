import { createAsyncThunk } from "@reduxjs/toolkit"

const addProductToFavorites = createAsyncThunk('ads/addProductToFavorites', async (data) => {
    try {
        const post = await fetch('http://localhost:8000/api/favorites/', {
            method: 'POST',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const response = await post.json()
        return response
    } catch (e) {
        throw new Error(e)
    }
})

export default addProductToFavorites