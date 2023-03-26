import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, LightBulbIcon, CurrencyDollarIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'

const Sidebar = ({active, setActive}) => {
  

  return (
    <div className='w-[250px]   text-gray-500 text-sm h-screen bg-gray-900/100 z-50' >
        <div className='flex space-x-2 items-center mb-10 pt-4 pl-4'>
            <img className='h-16 w-16 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53zz1baGk5vMRjLAtmvjUoX1ZPQnvDefWhLcykyrbYjuwWWQVAcjxzfRfRmr6jcbctOk&usqp=CAU" alt="" />
            <p className='text-2xl text-blue-500 font-semibold'>Cryptoverse</p>
        </div>
        <div className='flex flex-col gap-4'>
        <Link to={'/'}>
            <div onClick={()=> setActive("Home")} className={`flex p-3  items-center space-x-4 ${active == 'Home' && 'text-white bg-blue-500'}`}>
            <HomeIcon className='h-5 w-5' />
            <p>Home</p>
            </div>
        </Link>

        <Link to={'/cryptocurrencies'}>
            <div onClick={()=> setActive('Cryptocurrencies')} className={`flex p-3 items-center space-x-4 ${active == 'Cryptocurrencies' && 'text-white bg-blue-500'}`}>
            <PresentationChartBarIcon className='h-5 w-5' />
            <p>Cryptocurrencies</p>
            </div>
        </Link>

        <Link to={'/exchanges'}>
            <div onClick={()=> setActive('Exchanges')} className={`flex p-3 items-center space-x-4 ${active == 'Exchanges' && 'text-white bg-blue-500'}`}>
            <CurrencyDollarIcon className='h-5 w-5' />
            <p>Exchanges</p>
            </div>
        </Link>

        <Link to={'/news'}>
            <div onClick={()=> setActive('News')} className={`flex p-3 items-center space-x-4 ${active == 'News' && 'text-white bg-blue-500'}`}>
            <LightBulbIcon className='h-5 w-5' />
            <p>News</p>
            </div>
        </Link>
        </div>
    </div>
  )
}

export default Sidebar