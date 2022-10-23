import { createAsyncThunk } from "@reduxjs/toolkit";


const loadUser = createAsyncThunk('auth/loaduser', async () => {
    if (localStorage.getItem('access')) {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/loaduser/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
            })

            const resjson = await res.json()
            return resjson
        } catch (e) {
            console.log(e);
        }
    } else {
        throw new Error("Dont have token !")
    }
})

export default loadUser
