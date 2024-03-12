import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArtist = createAsyncThunk('fetchArtist', async ({access_token, id}) => {
    const url = `https://api.spotify.com/v1/artists/${id}`
    const header = `Bearer ${access_token}`
    const artist = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return artist
},)


export const fetchArtistTopTracks = createAsyncThunk('fetchArtistTopTracks', async ({access_token, id}) => {
    const url = `https://api.spotify.com/v1/artists/${id}/top-tracks`
    const header = `Bearer ${access_token}`
    const tracks = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return tracks
},)

export const fetchArtistAlbums = createAsyncThunk('fetchArtistAlbums', async ({access_token, id, offset}) => {
    const url = `https://api.spotify.com/v1/artists/${id}/albums?limit=50&offset=${offset}`
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


export const artistSlice = createSlice({
    name: 'artists',
    initialState: {},
    reducers: {
        removeArtist: (state) => ({})
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArtist.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(fetchArtistTopTracks.fulfilled, (state, action) => {
            state.topTracks = [...action.payload.tracks]
        })
        builder.addCase(fetchArtistAlbums.fulfilled, (state, action) => {
            if(state.albums){
                state.albums.items && state.albums.items.push(...action.payload.items)
            }
            else{
                state.albums = {...action.payload}
            }
        })
    }
})
export const {removeArtist} = artistSlice.actions
export default artistSlice.reducer