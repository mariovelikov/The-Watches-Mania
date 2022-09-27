import { createAsyncThunk } from "@reduxjs/toolkit";


const logOut = createAsyncThunk('auth/logOut', async () => {
    if (localStorage.getItem('access')) {
        try {
            return await fetch(`http://localhost:8000/api/logout/blacklist/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'refresh_token': localStorage.getItem('refresh')
                })
            }).then((response) => {
                return response.json()
            }).then((data) => {
                return data
            })

        } catch (e) {
            console.log(e);
        }
    } else {
        throw new Error("Dont have token !")
    }
})

export default logOut