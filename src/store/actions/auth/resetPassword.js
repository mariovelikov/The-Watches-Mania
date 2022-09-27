import { createAsyncThunk } from "@reduxjs/toolkit";


const resetPassword = createAsyncThunk('auth/reset_password', async (email) => {
    try {
        const res = await fetch(`http://localhost:8000/auth/users/reset_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email)
        })

        const data = await res.json()
        return data

    } catch (e) {
        throw new Error(e)
    }
})

export default resetPassword