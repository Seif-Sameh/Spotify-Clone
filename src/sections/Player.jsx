import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchArtist, removeArtist } from '../redux/reducers/fetchArtist';
import { fetchAlbum, removeAlbum } from '../redux/reducers/fetchAlbum';
import { TiArrowShuffle } from "react-icons/ti";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { BsFillSkipStartFill } from "react-icons/bs";
import { BsFillSkipEndFill } from "react-icons/bs";
import { LuRepeat } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";
import { BsFilePlay } from "react-icons/bs";
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { MdOutlineDevices } from "react-icons/md";
import { BiVolumeFull } from "react-icons/bi";
import PlayerImageLoader from "../loaders/PlayerImageLoader"


function Player() {
  const dispatch = useDispatch()
  const token = useSelector((state) => (state.token))
  const playback = useSelector((state) => (state.playbackState))
  const item = playback && playback.item
  const album = item && item.album
  const images = album && album.images
  const img = images && images[1]
  const imgURL = img && img.url
  const artists = item && item.artists
  const Name = item && item.name
  const progress = playback && playback.progress_ms
  const duration = item && item.duration_ms
  const isPlaying = playback && playback.is_playing
  const reapeatState = playback && playback.repeat_state
  const shuffleState = playback && playback.shuffle_state
  const Device = playback && playback.device
  const volume = Device && Device.volume_percent

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className='px-2 flex text-white justify-between'>
      <div className='flex gap-3 items-center w-1/4 overflow-hidden'>
        {imgURL? <img src={imgURL} alt="" className='w-[60px] h-[60px] rounded-md' /> :<PlayerImageLoader/>}
        <div className='overflow-hidden whitespace-nowrap relative'>
          <p className={`text-md ${Name && (Name.length > 30 && 'animate-move')}`}>
            <Link to={`/album/${album && album.id}`} onClick={() => {dispatch(removeAlbum()) && dispatch(fetchAlbum({ access_token: token, id: album.id }))}}>
              {Name}
            </Link>
          </p>
          <p className={`text-gray-400 text-sm line-clamp-1 overflow-visible ${artists && (artists.length > 2 && 'animate-move' )}`}>
            {artists && artists.map((artist, index) => (
              <Link to={`/artist/${artist.id}`} key={index} onClick={() => {
                dispatch(removeArtist()) && dispatch(fetchArtist({ access_token: token, id: artist.id }))
              }}>
                {index != 0 && ', '}
                <span className='hover:underline  hover:text-white'>{artist.name}</span></Link>
            ))}
          </p>
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex justify-center items-center gap-4'>
          <div className='text-gray-400 hover:text-white cursor-pointer'>
            {shuffleState ? <TiArrowShuffle size={20} color='#1ED760'/> : <TiArrowShuffle size={20}/>}
          </div>
          <div className='text-gray-400 hover:text-white cursor-pointer'>
            <BsFillSkipStartFill size={25} />
          </div>
          <div className='text-white hover:scale-110 cursor-pointer '>
            {isPlaying ? <MdOutlinePauseCircleFilled size={45} /> : <MdOutlinePlayCircleFilled size={45} />}
          </div>
          <div className='text-gray-400 hover:text-white cursor-pointer'>
            <BsFillSkipEndFill size={25} />
          </div>
          <div className='text-gray-400 cursor-pointer'>
            {reapeatState == 'off' ? <LuRepeat size={20} /> : (reapeatState == 'context' ? <LuRepeat color='#1ED760' size={20} /> : <LuRepeat1 color='#1ED760' size={20} />)}
          </div>


        </div>
        <div className='flex gap-3 justify-center items-center text-sm w-full px-10 '>
          <span>{millisToMinutesAndSeconds(progress) == 'NaN:NaN' ? '0:00' : millisToMinutesAndSeconds(progress)}</span>
          <div className='h-[6px] w-full max-w-[500px] bg-gray-700 rounded-full'>
            <div className={`bg-white h-[6px] rounded-full`} style={{width : `${(progress/duration)*100}%`}}> 
            </div>
          </div>
          <span>{millisToMinutesAndSeconds(duration) == 'NaN:NaN' ? '0:00' : millisToMinutesAndSeconds(duration)}</span>
        </div>

      </div>
      <div className='flex gap-3 justify-end items-center w-1/4'>
      <div className='text-gray-400 hover:text-white cursor-pointer'>
        <BsFilePlay size={20}/>
      </div>
      <div className='text-gray-400 hover:text-white cursor-pointer'>
        <TbMicrophone2 size={20}/>
      </div>
      <div className='text-gray-400 hover:text-white cursor-pointer'>
        <HiOutlineQueueList size={20}/>
      </div>
      <div className='text-gray-400 hover:text-white cursor-pointer'>
        <MdOutlineDevices size={20} /> 
      </div>
      <div className='text-gray-400 hover:text-white cursor-pointer'>
        <BiVolumeFull size={20}/>
      </div>
      <div className='h-[6px] w-[100px] bg-gray-700 rounded-full'>
        <div className={`bg-white h-[6px] rounded-full`} style={{width : `${volume}%`}}> 
        </div>
      </div>


      </div>
    </div>
  )
}

export default Player