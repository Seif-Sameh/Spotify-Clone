import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../redux/reducers/categories'

function CategoriesSection() {
    const dispatch = useDispatch()
    const token = useSelector((state) => (state.token))
    const categories = useSelector((state) => (state.categories))

    useEffect(() => {
        dispatch(fetchCategories(token))
    }, [])
    
  return (
    <>

    <h1 className='text-2xl font-bold text-white pb-4'>Browse</h1>
    <div className='grid grid-cols-4 gap-3'>
        {
            categories.map((item) => (
                <div className='relative'>
                    <img src={item.icons[0].url} alt="" className='w-[200px] h-[200px] object-cover'/>
                    <p className='absolute bottom-4 w-full text-center font-bold text-lg text-white'>{item.name}</p>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default CategoriesSection