import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUserTopArtists = createAsyncThunk('getUserTopArtists', async (access_token) => {
    const url = `https://api.spotify.com/v1/me/top/artists`
    const header = `Bearer ${access_token}`
    const topArtists = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return topArtists
},)


export const topArtistsSlice = createSlice({
    name: 'topArtists',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserTopArtists.fulfilled, (state, action) => {
            const result = { ...action.payload }
            const topArtists = result.items
            return topArtists
        })
    }
})

export default topArtistsSlice.reducer