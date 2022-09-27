import { createAsyncThunk } from "@reduxjs/toolkit";

const signIn = createAsyncThunk('auth/signin', async (data) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/token/`, {
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