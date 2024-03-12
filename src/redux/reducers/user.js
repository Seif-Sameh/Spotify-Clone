import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUserInfo = createAsyncThunk('getUserInfo', async (token) => {
    const url = "https://api.spotify.com/v1/me"
    const header = `Bearer ${token}`
    const user = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return user
},)


export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state = action.payload
            const display_name = state && state.display_name
            const firstName = display_name && display_name.split(' ')[0]
            const avatar = state && state.images[0]
            const avatarUrl = avatar && avatar.url
            const finalState = { ...action.payload, first_name: firstName, avatar: avatarUrl }
            return finalState
        })
    }
})
export default userSlice.reducer