import { createAsyncThunk } from "@reduxjs/toolkit";

const signIn = createAsyncThunk('auth/signin', async (data) => {
    try {
        const res = await fetch(`67.205.158.115/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resjson = await res.json()
        return resjson
    } catch (e) {
        console.log(e);
    }
})

export default signIn