import millify from 'millify'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = () => {
  const params = useParams();
  const {data: cryptoList, isFetching} = useGetCryptosQuery()  
  const [cryptolist, setCryptolist] = useState([])
  const [search, setSearch] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  
  useEffect(()=>{
    if(params){
     
      if(params['*'] == ''){
          setCryptolist(cryptoList?.data?.coins.slice(0, 10))
      }
      else{
          setCryptolist(cryptoList?.data?.coins)
      }
    }
    
  },[params, cryptoList])

  
  useEffect(()=>{
    if(search) setFilteredItems(cryptolist?.filter(item => item?.name.toLowerCase()?.includes(search.toLowerCase())))
    else{
      setFilteredItems([])
    }
  },[search])

  if (isFetching) return '...Loading'
  
  return (
    <div className='p-4'>
      {params['*'] != '' && 
      <div className='w-full flex items-center justify-center mb-10'>
        <input value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='Search Cryptocurrency' className='p-2 text-sm w-[250px] bg-slate-100 rounded-sm placeholder:text-xs outline-none border-blue-500 border-2' type="text" />
      </div>}
      <div className='flex-1  flex flex-wrap gap-2'>
      {
        cryptolist?.length > 0 &&
         (filteredItems?.length > 0 ? filteredItems : cryptolist)?.map((item, index) => (
          <Link to={`/crypto/${item?.uuid}`} key={item?.uuid} className='w-[240px] h-[180px] bg-gray-100 shadow-sm hover:shadow-lg'>
            
            <div className='flex items-center justify-between p-4 border-b '>
              <p className='font-semibold text-sm'>{item?.rank}. {item?.name}</p>
              <img className='h-6 w-6' src={item?.iconUrl} alt="" />
            </div>

            <div className='p-4 text-xs'>
              <p className='mt-2'>Price: {millify(item?.price)}</p>
              <p className='mt-2'>Market: {millify(item?.marketCap)}</p>
              <p className='mt-2'>Daily changes: {millify(item?.change)}</p>
            </div>

          </Link> 
        ))
      }
      </div>
      
    </div>
  )
}

export default Cryptocurrencies