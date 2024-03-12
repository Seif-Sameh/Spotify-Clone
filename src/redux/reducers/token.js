import { createSlice } from "@reduxjs/toolkit";


export const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState: '',
    reducers: {
        setToken: (state, action) => {
            return action.payload
        },
        getToken: (state) => (state),
        deleteToken: (state) => ('')
    }
})

export const { setToken, getToken, deleteToken } = tokenSlice.actions
export default tokenSlice.reducer