import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {search} from '../redux/reducers/search'
import CardSection from '../components/CardSection'
import { removeSearchResult } from '../redux/reducers/search'
import { IoCloseSharp } from "react-icons/io5";
import CategoriesSection from '../components/CategoriesSection'
import { fetchCategories } from '../redux/reducers/categories'




function Search() {
  const [searchInput, setSearchInput] = useState("")
  const token = useSelector((state) => (state.token))
  const dispatch = useDispatch()   

  
  useEffect(() => {
    dispatch(search({access_token: token, input: searchInput}))
  },[searchInput])

  useEffect(() => {
    dispatch(fetchCategories(token))
}, [])
  
  const albums = useSelector((state) => (state.search.albums))
  const artists = useSelector((state) => (state.search.artists))
  const tracks = useSelector((state) => (state.search.tracks))
  
  
  const input = useRef(null) 
  if(searchInput == ''){dispatch(removeSearchResult())}

  return (
    <div className='px-5 py-3'>
      <div className='flex relative'>
        <input type='text' ref={input} className='h-[45px] w-full rounded-full bg-[#252525] px-4 text-sm text-gray-300 focus:ring-2 focus:ring-white hover:border-1 hover:bg-[#303030]  outline-none mb-6' placeholder='What do you want to listen to?'
        onChange={(e) => {
          setSearchInput(`${e.target.value}`)
        }}
        />
        <div className={`absolute right-4 top-[10px] w-6 h-6 flex justify-center items-center hover:cursor-pointer ${searchInput == '' && 'hidden'}`} 
        onClick={(e) => {
          setSearchInput('') 
          input.current.value = ''
        }}>
          <IoCloseSharp />
        </div>
      </div>

      {(albums || artists || tracks) ? <h1 className='text-2xl font-bold text-white'>Results</h1> : <CategoriesSection/>}
      {albums&& <CardSection items={albums} title='Albums' type="albums"/>}
      {artists && <CardSection items={artists} title='Artists' type="artists"/>}
      {tracks && <CardSection items={tracks} title='Tracks' type="tracks"/>}

    </div>
  )
}

export default Search