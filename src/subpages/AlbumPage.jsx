import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiClock } from "react-icons/fi";
import { MdExplicit } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import AlbumImageLoader from '../loaders/AlbumImageLoader'
import { Link } from 'react-router-dom';
import { fetchArtist, removeArtist } from '../redux/reducers/fetchArtist';


function AlbumPage() {
  const album = useSelector((state) => (state.album))
  const token = useSelector((state) => (state.token))
  const dispatch = useDispatch()
  const images = album && album.images
  const image = images && images[0]
  const imageUrl = image && image.url
  const Name = album && album.name
  const Artists = album && album.artists
  const ReleaseDate = album && album.release_date
  const trackObj = album && album.tracks
  const Tracks = trackObj && trackObj.items
  const copyrights = album && album.copyrights
  const releaseDateObj = new Date(ReleaseDate)

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div>
      <div className='px-5 py-3 bg-gradient-to-b from-gray-500 to-transparent'>
        <div className='flex gap-5 text-white py-5'>
          {imageUrl ? <img src={imageUrl} alt="" className='w-[200px] h-[200px]' /> : <AlbumImageLoader />}
          <div className='flex flex-col justify-end gap-4'>
            <p className='capitalize'>{album && album.album_type}</p>
            <h1 className={`font-bold max-w-[100%] leading-tight line-clamp-2 ${Name && Name.length < 10 && 'text-[6rem]'} ${Name && (Name.length >= 10 && Name.length < 13) && 'text-[5rem]'} ${Name && (Name.length >= 13 && Name.length < 15) && 'text-[4rem]'} ${Name && (Name.length >= 15 && Name.length < 18) && 'text-[3rem]'} ${Name && Name.length >= 18 && 'text-[2rem]'}`} >{album && Name}</h1>
            <div className='text-sm'>{Artists && Artists.map((artist, index) => (<Link to={`/artist/${artist.id}`} key={index} onClick={() => { dispatch(removeArtist()) && dispatch(fetchArtist({ access_token: token, id: artist.id })) }} > <span className='hover:underline'>{artist.name}</span> • </Link>))}  {ReleaseDate && ReleaseDate.slice(0, 4)} • {album && album.total_tracks} songs</div>
          </div>
        </div>
      </div>
      <div className='px-5 py-3'>
        <div className='w-full'>
          <div className='grid  grid-cols-12 text-gray-500 border-b-[1px] border-gray-700 py-3 h-[50px] text-sm mb-2'>
            <span className='col-span-1 text-center'>#</span>
            <span className='col-span-10 text-left'>Title </span>
            <div className='col-start-12 col-span-1 flex justify-center items-center'>
              <FiClock />
            </div>
          </div>
          <div>
            {
              Tracks && Tracks.map((track) => (
                <div key={track.track_number} className='grid grid-cols-12 hover:bg-[#252525] py-2 hover:cursor-pointer rounded-md group'>
                  <div className='col-span-1 text-center relative flex justify-center items-center'>
                    <span className='group-hover:hidden'>{track.track_number}</span>
                    <div className='group-hover:flex justify-center items-center hidden '><FaPlay color='white' size={15} /></div>
                  </div>
                  <span className='col-span-10 text-left truncate '>
                    {track.name}
                    <span className='flex items-center gap-1 text-[14px] leading-5  font-light text-gray-400'>
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
                    </span>
                  </span>
                  <div className='col-start-12 col-span-1 flex justify-center items-center text-sm'>{millisToMinutesAndSeconds(track.duration_ms)}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='px-5 py-3'>
        <p className='text-gray-400 text-[14px]'>{releaseDateObj && releaseDateObj.toDateString().slice(4, )}</p>
        {
          copyrights && copyrights.map((item) => (
            <p className='text-[12px] text-gray-400'>
              <span>{item.type == "C" && <>&#169;</>}  </span>
              <span className='text-[16px] align-sub'>{item.type == "P" && <>&#x2117;</>} </span>
              <span>{item.text}</span>
            </p>
          ))
        }
      </div>
    </div>
  )
}

export default AlbumPage