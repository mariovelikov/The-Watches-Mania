import { createSlice } from "@reduxjs/toolkit";
import signIn from "../actions/auth/signIn";
import signUp from "../actions/auth/signUp";
import loadUser from "../actions/auth/loadUser";
import checkToken from "../actions/auth/checkToken";
import logOut from "../actions/auth/logOut";
// import { isAdmin } from "../actions/auth/loadUser";


const initialState = {
    access: localStorage.getItem('access'),
    // refresh: localStorage.getItem('refresh'),
    // isAdmin: null,
    isAuthenticated: null,
    user: null,
    error: null
}


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers(builder) {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                if (action.payload.detail) {
                    // localStorage.removeItem('access', action.payload.access)
                    state.error = action.payload.detail
                } else {
                    localStorage.setItem('access', action.payload.access)
                    localStorage.setItem('refresh', action.payload.refresh)

                    state.error = null
                    state.isAuthenticated = true
                }
            })
            .addCase(signIn.rejected, (state) => {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')

            })
        builder
            .addCase(loadUser.fulfilled, (state, action) => {
                if (!action.payload.code) {
                    state.error = null
                    state.isAuthenticated = true
                    state.user = action.payload
                }
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.isAuthenticated = null
            })

        builder
            .addCase(signUp.fulfilled, (state, action) => {
                if (Object.keys(action.payload).length === 1) {
                    state.error = action.payload[Object.keys(action.payload)]
                } else {
                    state.error = null
                    state.isAuthenticated = true
                    state.user = action.payload
                }
            })
        builder
            .addCase(checkToken.fulfilled, (state, action) => {
                if (!action.payload.code) {
                    localStorage.setItem('access', action.payload.access)
                    state.isAuthenticated = null
                } else {
                    state.error = action.payload.code
                }
            })
            .addCase(checkToken.rejected, (state, action) => {

            })
        builder
            .addCase(logOut.fulfilled, (state, action) => {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')

                state.user = null
                state.isAuthenticated = null
                state.access = null
            })
    }
})

// export const { logout } = AuthSlice.actions
export default AuthSlice.reducer