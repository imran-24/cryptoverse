import millify from 'millify'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'

const Homepage = ({active, setActive}) => {
  const {data, isFetching} =  useGetCryptosQuery()
  const globalStats = data?.data?.stats
  
  if (isFetching) return '...Loading' 
  return (
    <div className='w-full  h-full'>
      <h2 className='text-2xl p-4 mb-3'>Global Crypto Stats</h2>
      
      <div className='flex items-center p-4 justify-between flex-wrap '>
        
        <div className='w-1/2'>
          <p className='font-light text-gray-500'>Total Cryptocurrencies</p>
          <p className='text-xl mt-2'>{globalStats?.total}</p>
        </div>

        <div className='w-1/2'>
          <p className='font-light text-gray-500'>Total Exchanges</p>
          <p className='text-xl mt-2'>{millify(globalStats?.totalExchanges)}</p>
        </div>

        <div className='w-1/2'>
          <p className='font-light text-gray-500'>Total Market Cap</p>
          <p className='text-xl mt-2'>{millify(globalStats?.totalMarketCap)}</p>
        </div>

        <div className='w-1/2'>
          <p className='font-light text-gray-500'>Total 24h Volume</p>
          <p className='text-xl mt-2'>{millify(globalStats?.total24hVolume)}</p>
        </div>

        <div className='w-1/2'>
          <p className='font-light text-gray-500'>Total Markets</p>
          <p className='text-xl mt-2'>{millify(globalStats?.totalMarkets)}</p>
        </div>

      </div>

      <div className='mt-10 mb-10 '>
        <div className='flex items-center justify-between px-4'>
          <h2 className='text-2xl mb-3 '>Top 10 Cryptocurrencies in the world </h2>
          <Link onClick={()=> setActive('Cryptocurrencies')} to={'/cryptocurrencies'} className='text-blue-500 font-semibold'>Show More</Link>
        </div>
        <Cryptocurrencies  />
      </div>

      <div className='mt-10 mb-10'>
        <div className='flex items-center justify-between px-4'>
          <h2 className='text-2xl mb-3 '>Latest Crypto News</h2>
          <Link onClick={()=> setActive('News')} to={'/news'} className='text-blue-500 font-semibold'>Show More</Link>
        </div>
        <News />
      </div>



    </div>
  )
}

export default Homepage