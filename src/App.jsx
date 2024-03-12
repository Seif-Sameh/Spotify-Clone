import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home"
import { useEffect } from "react"
import {getTokenFromResponse} from './authorization'
import { useDispatch, useSelector } from "react-redux"
import {getToken, setToken}  from "./redux/reducers/token"
import { Route, Routes } from "react-router-dom"
import Main from "./subpages/Main"
import Search from "./subpages/Search"
import AlbumPage from "./subpages/AlbumPage"
import PlaylistPage from "./subpages/PlaylistPage"
import ArtistPage from "./subpages/ArtistPage"



function App() {

  const token = useSelector((state) => (state.token))
  const dispatch = useDispatch()
  useEffect(() => {
    const hash = getTokenFromResponse()
    window.location.hash = ''
    if(hash.access_token){
      dispatch(setToken(hash.access_token))
    }
  }, [])
  

  return (
    <>
      <Routes>
        <Route exact path="login" element={<LoginPage/>}/>
        <Route path="/" element={<Home/>}>
          <Route path="home" element={<Main/>}/>
          <Route path="search" element={<Search/>}/>
          <Route path="album/:id" element={<AlbumPage/>}/>
          <Route path="playlist/:id" element={<PlaylistPage/>}/>
          <Route path="artist/:id" element={<ArtistPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
