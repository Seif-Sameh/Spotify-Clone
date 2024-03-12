import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchArtist, removeArtist } from '../redux/reducers/fetchArtist';

function NowPlaying() {
  const nowPlaying = useSelector((state) => (state.nowPlaying))
  const dispatch = useDispatch()
  const token = useSelector((state) => (state.token))
  const item = nowPlaying.item || ''
  const album = item.album || ''
  const images = album.images || ''
  const image = images[0] || ''
  const artists = nowPlaying.artists || ''
  return (
    <div className='p-2 flex flex-col'>
      <p className='text-lg font-normal mb-3'>Now Playing</p>
      <img src={image.url} alt="" className='mb-3 rounded-md'/>
      <div className='overflow-hidden whitespace-nowrap  relative'>
         <p className={`text-2xl text-white inline-block max-w-[230px] ${item && item.name.length > 20 && 'animate-move' }`}> {item.name}</p>
      </div>
      <div className='overflow-hidden whitespace-nowrap relative'>
         <p className={`text-gray-400 inline-block max-w-[230px] text-sm ${artists.length > 2 && 'animate-move' }`}> {artists && artists.map((artist, index) => (
                        <Link to={`/artist/${artist.id}`} key={index} onClick={() => { 
                          dispatch(removeArtist()) && dispatch(fetchArtist({ access_token: token, id: artist.id })) 
                          }}>
                            {index != 0 && ', '} 
                            <span className='hover:underline hover:text-gray-200'>{artist.name}</span></Link>
                      ))}</p>
      </div>
    </div>
  )
}

export default NowPlaying