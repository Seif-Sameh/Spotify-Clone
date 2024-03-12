import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAlbum = createAsyncThunk('fetchAlbum', async ({access_token, id}) => {
    const url = `https://api.spotify.com/v1/albums/${id}`
    const header = `Bearer ${access_token}`
    const album = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return album
},)


export const albumSlice = createSlice({
    name: 'album',
    initialState: {},
    reducers: {
        removeAlbum: (state) => ({})
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlbum.fulfilled, (state, action) => {
            return action.payload
        })
    }
})
export const {removeAlbum} = albumSlice.actions
export default albumSlice.reducer