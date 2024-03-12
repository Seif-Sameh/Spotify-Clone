import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FiClock } from "react-icons/fi";
import { MdExplicit } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";
import { fetchPlaylistItems } from '../redux/reducers/fetchPlaylist';
import AlbumImageLoader from '../loaders/AlbumImageLoader';
import { EmptyPlaylist } from '../assets/index'
import { useParams } from 'react-router-dom';
import { removeArtist, fetchArtist } from '../redux/reducers/fetchArtist';
import { removeAlbum, fetchAlbum } from '../redux/reducers/fetchAlbum';
import { Link } from 'react-router-dom';




function PlaylistPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const token = useSelector((state) => (state.token))
  const playlist = useSelector((state) => (state.playlist))
  const images = playlist && playlist.images
  const image = images && images[0]
  const imageUrl = image && image.url
  const Name = playlist && playlist.name
  const Owner = playlist && playlist.owner
  const trackObj = playlist && playlist.tracks
  const Tracks = trackObj && trackObj.items
  const TotalTracks = trackObj && trackObj.total
  let count = 0


  useEffect(() => {
    if (count < TotalTracks) {
      dispatch(fetchPlaylistItems({ access_token: token, id: params.id, offset: count }))
    }
  }, [playlist])

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }


  return (
    <div>
      <div className='px-5 py-3 bg-gradient-to-b from-gray-500 to-transparent'>
        <div className='flex gap-5 text-white py-5'>
          {imageUrl ? <img src={imageUrl} alt="" className='w-[200px] h-[200px]' /> : (imageUrl === undefined ? <AlbumImageLoader /> : <img src={EmptyPlaylist} className='w-[200px] h-[200px]' />)}
          <div className='flex flex-col justify-end gap-4'>
            <p className='capitalize'>{playlist && playlist.type}</p>
            <h1 className={`font-bold max-w-[100%] leading-tight line-clamp-2 ${Name && Name.length < 10 && 'text-[6rem]'} ${Name && (Name.length > 10 && Name.length <= 13) && 'text-[5rem]'} ${Name && (Name.length > 13 && Name.length <= 15) && 'text-[4rem]'} ${Name && (Name.length > 15 && Name.length <= 18) && 'text-[3rem]'} ${Name && Name.length > 18 && 'text-[2rem]'} `} >{playlist && Name}</h1>
            <p className='text-sm'>{Owner && Owner.display_name} • {playlist.followers && playlist.followers.total} Likes • {TotalTracks && TotalTracks} songs</p>
          </div>
        </div>
      </div>
      <div className='px-5 py-3'>
        <div className='flex items-center justify-center w-[50px] h-[50px] pl-1 rounded-full bg-primary mb-4 cursor-pointer hover:scale-105'><IoMdPlay color='black' size={25} /></div>
        <div className='w-full'>
          <div className='grid  grid-cols-12 text-gray-500 border-b-[1px] border-gray-700 py-3 h-[50px] text-sm mb-2 gap-2'>
            <span className='col-span-1 text-center'>#</span>
            <span className='col-span-5 text-left'>Title </span>
            <span className='col-span-3 text-left'>Album </span>
            <span className='col-span-2 text-left'>Date added </span>
            <div className='col-start-12 col-span-1 flex justify-center items-center'>
              <FiClock />
            </div>
          </div>
          <div>
            {
              Tracks && Tracks.map((t) => {
                const track = t.track
                const date = new Date(t.added_at)
                const display_date = `${date.toDateString().slice(3,)}`
                return (
                  <div key={count} className='grid grid-cols-12 hover:bg-[#252525] py-2 hover:cursor-pointer rounded-md group gap-2'>
                    <div className='col-span-1 text-center relative flex justify-center items-center'>
                      <span className='group-hover:hidden text-[14px] leading-5  font-light text-gray-300'>{++count}</span>
                      <div className='group-hover:flex justify-center items-center hidden '><FaPlay color='white' size={15} /></div>
                    </div>
                    <div className='col-span-5 text-left flex items-center gap-3'>
                      <img src={track.album.images[0].url} alt="" className='w-[40px] h-[40px]' />
                      <div className='flex flex-col max-w-[80%]'>
                        <p className='truncate'>{track.name}</p>
                        <div className='flex items-center gap-1 text-[14px] leading-5  font-light text-gray-300'>
                          {track.explicit && <MdExplicit />}
                          <span className='truncate'>
                          {track.artists.map((artist, index) => (
                            <Link to={`/artist/${artist.id}`} key={index} onClick={() => {
                              dispatch(removeArtist()) && dispatch(fetchArtist({ access_token: token, id: artist.id }))
                            }}>
                              {index != 0 && ', '}
                              <span className='hover:underline'>{artist.name}</span></Link>
                          ))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center col-span-3 text-left text-[14px] leading-5  font-light text-gray-300'><span className='truncate hover:underline'> <Link to={`/album/${track.album.id}`} onClick={() => {dispatch(removeAlbum()) && dispatch(fetchAlbum({ access_token: token, id: track.album.id }))}} >{track.album.name} </Link> </span></div>
                    <div className='flex items-center col-span-2 text-left text-[14px] leading-5  font-light text-gray-300 '><span>{display_date}</span></div>
                    <div className='col-start-12 col-span-1 flex justify-center items-center text-[14px] leading-5  font-light text-gray-300'>{millisToMinutesAndSeconds(track.duration_ms)}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistPage