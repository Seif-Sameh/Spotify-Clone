import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskList from '../loaders/PlaylistsLoader'
import CardSection from '../components/CardSection'
import { deleteToken } from '../redux/reducers/token'

function Main() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const playlists = useSelector((state) => (state.playlists))
  const albums = useSelector((state) => (state.albums))
  const topArtists = useSelector((state) => (state.topArtists))
  return (
    <div className='bg-gradient-to-b  from-primary to-[150px] to-container '>
      <div className=' px-3 pt-6 pb-2 '>
      {user == {} ? <TaskList /> :
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-black text-black'> Welcome back {user.first_name},</h1>
            <div  className='flex gap-4'>
            <img src={user.avatar} alt="" className='rounded-full border-black border-2 w-[35px] h-[35px]' />
            <button className='text-sm bg-gray-100 text-black rounded-full py-1 px-3 cursor-pointer active:bg-gray-300 ' onClick={() => {
              dispatch(deleteToken())
              window.location.pathname = '/login'
            }}>Log out</button>
            </div>
          </div>
      }
      </div>
    <div className='flex flex-col px-5 py-3'>
      <CardSection items={playlists} title='Your Playlists' type="playlists"/>
      <CardSection items={albums} title='Your Albums' type="albums"/>
      <CardSection items={topArtists} title='Your Top Artists' type="artists"/>
    </div>
  </div>
  )
}

export default Main