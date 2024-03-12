import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const search = createAsyncThunk('search', async ({ access_token, input }) => {
    const url = `https://api.spotify.com/v1/search?q=${input}&type=album%2Ctrack%2Cartist&limit=12`
    const header = `Bearer ${access_token}`
    const Search = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return Search
},)


export const searchSlice = createSlice({
    name: 'search',
    initialState: {},
    reducers: {
        removeSearchResult: (state) => ({})
    },
    extraReducers: (builder) => {
        builder.addCase(search.fulfilled, (state, action) => {
            const albums = action.payload.albums.items
            const artists = action.payload.artists.items
            const tracks = action.payload.tracks.items
            const finalTracks = tracks.map((track) => ({ ...track, images: track.album.images }))

            return ({ albums: albums, artists: artists, tracks: finalTracks })
        })
    }
})

export const { removeSearchResult } = searchSlice.actions
export default searchSlice.reducer