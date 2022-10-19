import { createAsyncThunk } from "@reduxjs/toolkit";

const removeProductFromFavorites = createAsyncThunk('ads/removeProductFromFavorites', async (data) => {
    try {
        const request = await fetch(`67.205.158.115/api/remove_fav/${data.productId}`, {
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