import { useEffect, useState } from "react";
import { GoHome, GoHomeFill} from "react-icons/go";
import { RiSearch2Line, RiSearch2Fill} from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import Playlists from "../sections/Playlists";
import Player from "../sections/Player";
import NowPlaying from "../sections/NowPlaying";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/reducers/user";
import {fetchUserPlaylists} from "../redux/reducers/playlists"
import {fetchUserAlbums} from "../redux/reducers/albums"
import { fetchUserTopArtists } from "../redux/reducers/topArtists";
import { fetchNowPlaying } from "../redux/reducers/nowPlaying";
import { fetchPlaybackState } from "../redux/reducers/playbackState";
import { Navigate } from "react-router-dom";


function Home() {
  const [homeIconsState, setHomeIconsState] = useState(true)
  const [searchIconsState, setsearchIconsState] = useState(false)
  const [tokenState, setTokenState ] = useState(true)
  const token = useSelector((state) => (state.token))   
  const user = useSelector((state) => (state.user))
  const dispatch = useDispatch()
  
  useEffect(() => {
    token ? setTokenState(true) : setTokenState(false)
    dispatch(fetchUserInfo(token))
  },[token])

  useEffect(() => {
      dispatch(fetchPlaybackState(token))
      dispatch(fetchUserPlaylists(token))
      dispatch(fetchUserAlbums(token))
      dispatch(fetchUserTopArtists(token))
      dispatch(fetchNowPlaying(token))
      const player = setInterval(() => {
        dispatch(fetchPlaybackState(token))
      }, 1000)    

      const interval = setInterval(() => {
        dispatch(fetchNowPlaying(token))
      }, 10000)    
    return () => {
      clearInterval(interval)
      clearInterval(player)
      
    };
  },[user])


  
  return (
    <>
    <div className="flex justify-between p-2 h-[90vh] text-gray-300 ">
      <div className="w-1/3 mr-2 h-full flex flex-col max-lg:hidden" >
        <nav className="rounded-md bg-container p-5 mb-2 flex flex-col gap-3">
          <Link to='/'>
          <button className="flex items-center hover:text-gray-100 focus:text-gray-100 w-full" onClick={() => {setHomeIconsState(true); setsearchIconsState(false)}}>
            {homeIconsState? <GoHomeFill size={25} /> :<GoHome size={25}/> }
            <p className="text-lg ml-4 font-normal ">Home</p>
          </button>
          </Link>
          <Link to='/search'>
          <button className="flex items-center hover:text-gray-100  focus:text-gray-100 w-full" onClick={() => {setHomeIconsState(false); setsearchIconsState(true)}}>
          {searchIconsState? <RiSearch2Fill size={25} /> :<RiSearch2Line size={25}/> }
            <p className="text-lg ml-4 font-normal">Search</p>
          </button>
          </Link>
        </nav>
        <section className="rounded-md bg-container p-2 flex-1 overflow-y-scroll">
          <Playlists/>
        </section>
      </div>
      <div className="w-full bg-container rounded-md  overflow-y-scroll">
        <Outlet/>
      </div>
      <section className="w-1/3 bg-container ml-2 rounded-md p-2 max-lg:hidden">
        <NowPlaying/>
      </section>
    </div>
    <section className="bg-black fixed bottom-0 w-full h-[10vh] p-2">
      <Player/>
    </section>
    {!tokenState && <Navigate to="login" replace={true} />}
    </>
  )
}

export default Home