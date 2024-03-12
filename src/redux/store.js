import { configureStore } from "@reduxjs/toolkit";
import  tokenSlice  from "./reducers/token";
import  userSlice  from "./reducers/user";
import  playlistsSlice  from "./reducers/playlists";
import  albumsSlice from "./reducers/albums";
import  topArtistsSlice  from "./reducers/topArtists";
import  nowPlayingSlice  from "./reducers/nowPlaying";
import  searchSlice  from "./reducers/search";
import  albumSlice  from "./reducers/fetchAlbum";
import  playlistSlice  from "./reducers/fetchPlaylist";
import  artistSlice  from "./reducers/fetchArtist";
import  playbackStateSlice  from "./reducers/playbackState";
import  categoriesSlice  from "./reducers/categories";


export const Store = configureStore({
    reducer:{
        token : tokenSlice,
        user : userSlice,
        playbackState : playbackStateSlice,
        playlists: playlistsSlice,
        albums: albumsSlice,
        topArtists: topArtistsSlice,
        nowPlaying: nowPlayingSlice,
        search : searchSlice,
        categories: categoriesSlice,
        album : albumSlice,
        playlist: playlistSlice,
        artist : artistSlice
    }
})

