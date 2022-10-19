import { createAsyncThunk } from "@reduxjs/toolkit";


const resetPasswordConfirm = createAsyncThunk('auth/reset_password_confirm', async (data) => {
    try {
        console.log(data);
        // !!22ssEE233AD

        const res = await fetch(`67.205.158.115/auth/users/reset_password_confirm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const resjson = await res.json()

        return resjson
    } catch (e) {
        throw new Error(e)
    }
})

export default resetPasswordConfirm