import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, LightBulbIcon, CurrencyDollarIcon, Bars3Icon,  PresentationChartBarIcon } from '@heroicons/react/24/outline'

const Navbar = ({active, setActive}) => {
  const [show, setShow] = useState(false)

  return (
    <div className=' text-gray-500 text-sm w-screen bg-gray-900/100 z-50' >
        <div className='flex space-x-2 items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
            <img className='h-10 w-10 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53zz1baGk5vMRjLAtmvjUoX1ZPQnvDefWhLcykyrbYjuwWWQVAcjxzfRfRmr6jcbctOk&usqp=CAU" alt="" />
            <p className='text-2xl text-blue-500 font-semibold'>Cryptoverse</p>
            </div>
            <Bars3Icon onClick={()=> setShow(!show)} className='h-4 w-4 text-white' />
        </div>

        <div >
        {
            show && 
            <div className='flex flex-col transition-all duration-200 ease-out gap-4'>
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
          }
          
        </div>
        
    </div>
  )
}

export default Navbar