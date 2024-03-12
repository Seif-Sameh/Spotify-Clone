import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlaylist = createAsyncThunk('fetchPlaylist', async ({access_token, id}) => {
    const url = `https://api.spotify.com/v1/playlists/${id}`
    const header = `Bearer ${access_token}`
    const playlist = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return playlist
},)


export const fetchPlaylistItems = createAsyncThunk('fetchPlaylistItems', async ({access_token, id, offset}) => {
    const url = `https://api.spotify.com/v1/playlists/${id}/tracks?offset=${offset}`
    const header = `Bearer ${access_token}`
    const playlistTracks = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return playlistTracks
},)


export const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {},
    reducers: {
        removePlaylist: (state) => ({})
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(fetchPlaylistItems.fulfilled, (state, action) => {
            state.tracks.items.push(...action.payload.items)
        })
    }
})
export const {removePlaylist} = playlistSlice.actions
export default playlistSlice.reducer