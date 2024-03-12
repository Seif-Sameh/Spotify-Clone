import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoMdPlay } from "react-icons/io";
import { MdExplicit } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { fetchArtistAlbums, fetchArtistTopTracks} from '../redux/reducers/fetchArtist';
import CardSection from '../components/CardSection';
import {fetchAlbum, removeAlbum } from '../redux/reducers/fetchAlbum';

function ArtistPage() {
    const dispatch = useDispatch()
    const params = useParams()
    const token = useSelector((state) => (state.token))
    const artist = useSelector((state) => (state.artist))
    const images = artist && artist.images
    const img = images && images[0]
    const Name = artist && artist.name
    const Followers = artist.followers && artist.followers.total
    const TopTracks = artist.topTracks && artist.topTracks
    const items = artist.albums && artist.albums.items
    const length = items && items.length
    const Albums = items && items.filter((a) => (a.album_group == 'album'))
    const Singles = items && items.filter((a) => (a.album_group == 'single'))
    const AppearsOn = items && items.filter((a) => (a.album_group == 'appears_on'))
    const TotalAlbums = artist.albums && artist.albums.total
    let count = 0


    useEffect(() => {
        Name && dispatch(fetchArtistTopTracks({ access_token: token, id: params.id }))
        Name && dispatch(fetchArtistAlbums({ access_token: token, id: params.id, offset: 0 }))
    },[Name])

    useEffect(() => {
        if(length % 50 == 0 && length <= TotalAlbums){
            console.log(length, TotalAlbums)
          dispatch(fetchArtistAlbums({access_token: token, id: params.id, offset: length}))
        }  
      },[artist])



    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }


    return (
        <>
            <div className='relative'>
                <div className='w-full h-[250px] overflow-hidden'>
                    <img src={img && img.url} alt="" className='w-full mt-[-20%]' />
                </div>
                <div className='w-full absolute top-[40px] px-6'>
                    <div className='h-full text-white z-10  flex flex-col justify-center gap-3' >
                        <div className='flex items-center gap-3'>
                            <div className='bg-white overflow-visible w-4 h-4 relative' >
                                <div className='absolute top-[-7px] left-[-7px] '>
                                    <VscVerifiedFilled fill='#1DA1F2' size={30} />
                                </div>
                            </div>
                            <span className='text-sm text-gray-100'>Verified Artist</span>
                        </div>
                        <p className={`font-bold max-w-[100%] leading-tight line-clamp-2 ${Name && Name.length <= 10 && 'text-[6rem]'} ${Name && (Name.length > 10 && Name.length <= 13) && 'text-[5rem]'} ${Name && (Name.length > 13 && Name.length <= 15) && 'text-[4rem]'} ${Name && (Name.length > 15 && Name.length <= 18) && 'text-[3rem]'} ${Name && Name.length > 18 && 'text-[2rem]'} `}>{Name && Name}</p>
                        <p className='text-sm text-gray-100'>{Followers && Followers.toLocaleString()} Followers</p>
                    </div>
                </div>
                <div className='w-full px-5 py-3 bg-gradient-to-b from-gray-700 to-[200px] to-container absolute top-[250px] opacity-[98%]' >
                    <div className='flex items-center justify-center w-[50px] h-[50px] my-5 pl-1 rounded-full bg-primary mb-4 cursor-pointer hover:scale-105'><IoMdPlay color='black' size={25} /></div>
                    <p className='text-2xl font-bold py-5'>Popular</p>
                    {
                        TopTracks && TopTracks.map((track) => {
                            return (
                                <div key={count} className='grid grid-cols-12 hover:bg-[#252525] py-2 hover:cursor-pointer rounded-md group gap-2'>
                                    <div className='col-span-1 text-center relative flex justify-center items-center'>
                                        <span className='group-hover:hidden text-[14px] leading-5  font-light text-gray-300'>{++count}</span>
                                        <div className='group-hover:flex justify-center items-center hidden '><FaPlay color='white' size={15} /></div>
                                    </div>
                                    <div className='col-span-6 text-left flex items-center gap-3'>
                                        <img src={track.album.images[0].url} alt="" className='w-[40px] h-[40px]' />
                                        <div className='flex flex-col max-w-[80%]'>
                                            <p className='truncate text-white'>{track.name}</p>
                                            <div className='flex items-center gap-1 text-[18px] leading-5  font-light text-gray-300'>
                                                {track.explicit && <MdExplicit />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center col-span-4 text-left text-[14px] leading-5  font-light text-gray-300'>  <span className='truncate hover:underline'> <Link to={`/album/${track.album.id}`} onClick={() => {dispatch(removeAlbum()) && dispatch(fetchAlbum({ access_token: token, id: track.album.id }))}} >{track.album.name} </Link> </span> </div>
                                    <div className='col-start-12 col-span-1 flex justify-center items-center text-[14px] leading-5  font-light text-gray-300'>{millisToMinutesAndSeconds(track.duration_ms)}</div>
                                </div>
                            )
                        })
                    }


                    {
                        Albums && <CardSection items={Albums} title='Discography' type="albums" showMore={true}/>
                    }
                    {
                        Singles && <CardSection items={Singles} title='Singles' type="albums" showMore={true}/>
                    }
                    {
                        AppearsOn && <CardSection items={AppearsOn} title='Appears on' type="albums" showMore={true}/>
                    }

                </div>
            </div>
        </>
    )
}

export default ArtistPage