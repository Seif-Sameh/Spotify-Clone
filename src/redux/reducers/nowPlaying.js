import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchNowPlaying = createAsyncThunk('getNowPlaying', async (access_token) => {
    const url = `https://api.spotify.com/v1/me/player/currently-playing`
    const header = `Bearer ${access_token}`
    const NowPlaying = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return NowPlaying
},)


export const nowPlayingSlice = createSlice({
    name: 'nowPlaying',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNowPlaying.fulfilled, (state, action) => {
            const res = { ...action.payload }
            const item = res && res.item
            const artists = item && item.artists
            return { ...res, artists: artists }
        })
    }
})

export default nowPlayingSlice.reducer