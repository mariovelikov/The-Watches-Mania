import { createAsyncThunk } from "@reduxjs/toolkit";

// Check the validation of the access token
// If token not valid, token will be deleted

const checkToken = createAsyncThunk('auth/checkToken', async () => {
    try {
        return await fetch(`http://localhost:8000/api/token/verify/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('access') })
        }).then((rses) => {
            return rses.json()
        }).then((data) => {
            if (data['code'] === 'token_not_valid') {
                return fetch('http://localhost:8000/api/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: localStorage.getItem('refresh') })
                })
            }
        })
            .then((res) => {
                return res.json()
            }).then((data) => {
                return data
            })
    } catch (e) {
        throw new Error(e)
    }
})

export default checkToken