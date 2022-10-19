import { createAsyncThunk } from "@reduxjs/toolkit";


const loadUser = createAsyncThunk('auth/loaduser', async () => {
    if (localStorage.getItem('access')) {
        try {
            const res = await fetch(`67.205.158.115/api/loaduser/`, {
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
