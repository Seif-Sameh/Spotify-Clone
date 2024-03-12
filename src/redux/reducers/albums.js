import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUserAlbums = createAsyncThunk('getUserAlbums', async (access_token) => {
    const url = `https://api.spotify.com/v1/me/albums`
    const header = `Bearer ${access_token}`
    const albums = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return albums
},)


export const albumsSlice = createSlice({
    name: 'albums',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserAlbums.fulfilled, (state, action) => {
            const result = { ...action.payload }
            const items = result.items
            const albums = items && items.map((item) => (item.album))
            return albums
        })
    }
})

export default albumsSlice.reducer