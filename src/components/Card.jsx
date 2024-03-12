import React from 'react'
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import ImagesLoader from '../loaders/ImagesLoader'
import TitlesLoader from '../loaders/TitlesLoader'
import {fetchAlbum, removeAlbum} from '../redux/reducers/fetchAlbum'
import {fetchPlaylist, removePlaylist} from '../redux/reducers/fetchPlaylist';
import {fetchArtist, removeArtist} from '../redux/reducers/fetchArtist';
import {EmptyPlaylist} from  '../assets/index'

function Card({ item, type }) {
    const dispatch = useDispatch()
    const token = useSelector((state) => (state.token))
    const src = item && item.images[0]
    const artists = item && item.artists

    return (
        <div className='w-full min-w-[170px] group bg-lightContainer p-4 flex flex-col  rounded-md gap-2 cursor-pointer transition-colors hover:bg-[#252525]' 
        onClick={() => {
            item.type == 'album' && (dispatch(removeAlbum()) && dispatch(fetchAlbum({access_token: token, id: item.id })))
            item.type == 'playlist' && (dispatch(removePlaylist()) && dispatch(fetchPlaylist({access_token: token, id: item.id })))
            item.type == 'artist' && (dispatch(removeArtist()) && dispatch(fetchArtist({access_token: token, id: item.id })))
            item.type == 'track' && (dispatch(removeAlbum()) && dispatch(fetchAlbum({access_token: token, id: item.album.id })))
        }}>
            <Link to={item.type == 'album' && `/album/${item.id}` || item.type == 'playlist' && `/playlist/${item.id}` || item.type == 'artist' && `/artist/${item.id}` || item.type == 'track' && `/album/${item.album.id}`} className='flex flex-col gap-2'>
                <div className='relative flex justify-center'>
                    {src ? <img src={src.url} alt="" className={`self-center shadow-lg shadow-gray-900  object-cover ${type === 'artists' ? 'rounded-full h-[150px] w-[150px]' : 'rounded-md'}`} /> : (item ? <img src={EmptyPlaylist} className={`self-center shadow-lg shadow-gray-900  object-cover rounded-md`}/> : <ImagesLoader className="rounded-md"/>)}
                    <div className='hidden absolute bottom-3 right-3 bg-primary p-4 rounded-full group-hover:flex items-center justify-center group-hover:animate-fade-in shadow-md shadow-gray-900'>
                        <FaPlay color='black' />
                    </div>
                </div>
                <div>
                    {item ? <p className='w-full truncate mb-1 text-white font-semibold'>{item.name}</p> : <TitlesLoader className='mt-2 rounded-full' />}

                    {type === "playlists" && <p className='text-sm text-gray-300 line-clamp-2'>By {item.owner.display_name}</p>}
                    {type === "albums" && <p className='text-sm text-gray-300 line-clamp-2'>{
                    artists.map((artist, index) => (
                        <Link to={`/artist/${artist.id}`} key={index} onClick={() => { 
                          dispatch(removeArtist()) && dispatch(fetchArtist({ access_token: token, id: artist.id })) 
                          }}>
                            {index != 0 && ', '} 
                            <span className='hover:underline'>{artist.name}</span></Link>
                      ))}</p>}
                    {type === "artists" && <p className='text-sm text-gray-300 line-clamp-2'>Artist</p>}
                    {type == '' && <TitlesLoader className='mt-2 rounded-full' />}
                </div>
            </Link>
        </div>
    )
}

export default Card