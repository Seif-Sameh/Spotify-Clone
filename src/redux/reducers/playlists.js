import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserPlaylists = createAsyncThunk('getUserPlaylists', async (access_token) => {
    const url = `https://api.spotify.com/v1/me/playlists`
    const header = `Bearer ${access_token}`
    const playlists = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return playlists
},)


export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserPlaylists.fulfilled, (state, action) => {
            const result = { ...action.payload }
            const playlists = result.items
            return playlists
        })
    }
})

export default playlistsSlice.reducer