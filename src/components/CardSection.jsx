import React, { useState } from 'react'
import Card from './Card'

function CardSection({ items, title, type, showMore = false }) {
  const [showMoreState, setShowMoreState] = useState(false)

  return (
    <div className='py-4 mt-2'>
      <div className='flex justify-between'>
        <h2 className='text-xl mb-4 font-semibold text-white'>{title}</h2>
        {showMore && <span className='text-sm text-gray-300 hover:underline cursor-pointer ' onClick={() => {showMoreState ? setShowMoreState(false): setShowMoreState(true)}}> {showMoreState ? 'Show Less' : 'Show More'} </span>}
      </div>
      <div className='grid gap-5 xl:grid-cols-4 lg:grid-cols-3 lg:max-[1140px]:grid-cols-2 md:grid-cols-4  sm:grid-cols-3 max-sm:grid-cols-2  max-[376px]:grid-cols-1  justify-items-center'>
        {items.length > 0 ?
        (showMore ? (showMoreState ? items.map((item, index) => (<Card item={item} key={index} type={type} />)) : items.slice(0, 4).map((item) => (<Card item={item} key={item.id} type={type} />))) : items.map((item) => (<Card item={item} key={item.id} type={type} />))) :
          <>
          <Card item={''} key={'0'} type={''} />
          <Card item={''} key={'1'} type={''} />
          <Card item={''} key={'2'} type={''} />
          <Card item={''} key={'3'} type={''} />
         </> 
         }
      </div>
    </div>
  )
}

export default CardSection