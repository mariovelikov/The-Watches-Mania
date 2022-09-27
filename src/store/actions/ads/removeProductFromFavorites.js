import { createAsyncThunk } from "@reduxjs/toolkit";

const removeProductFromFavorites = createAsyncThunk('ads/removeProductFromFavorites', async (data) => {
    try {
        const request = await fetch(`http://127.0.0.1:8000/api/remove_fav/${data.productId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        })

        const response = await request.json()

        return response

    } catch (e) {
        return new Error(e)
    }
})

export default removeProductFromFavorites