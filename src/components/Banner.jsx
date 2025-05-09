import React from 'react'

function Banner({posterPath, name}) {
  return (
    <div className='h-[75vh] bg-cover bg-center flex items-end' style={{backgroundImage : `url(https://image.tmdb.org/t/p/original/${posterPath})`}}>
      <div className='text-white text-xl w-full text-center text-2xl bg-gray-900/60 p-4'>{name}</div>
    </div>
  )
}

export default Banner
