import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPlaybackState = createAsyncThunk('getUserPlaybackState', async (access_token) => {
    const url = `https://api.spotify.com/v1/me/player`
    const header = `Bearer ${access_token}`
    const player = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return player
},)


export const playbackStateSlice = createSlice({
    name: 'playbackState',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlaybackState.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default playbackStateSlice.reducer