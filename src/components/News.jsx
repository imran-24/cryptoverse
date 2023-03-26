import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const News = () => {
  const params = useParams()
  const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory: 'Cryptocurrency', count: 12})
 
  const [cryptoNewslist, setCryptoNewslist] = useState([])
  const [search, setSearch] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  useEffect(()=>{

    if(params){
      if(params['*'] === ''){
        setCryptoNewslist(cryptoNews?.value.slice(0, 6))
      }
      else{
        setCryptoNewslist(cryptoNews?.value)
      }
    }
    
  },[params,cryptoNews])
  
  useEffect(()=>{
    if(search) setFilteredItems(cryptoNewslist?.filter(item => item?.name.toLowerCase()?.includes(search.toLowerCase())))
    else{
      setFilteredItems([])
    }
  },[search])

  if (isFetching) return '...Loading'
  


  return (
    <div>
      <div className='py-4'>
      {params['*'] != '' && 
      <div className='w-full flex items-center justify-center mb-10'>
        <input value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='Search News' className='p-2 text-sm w-[250px] bg-slate-100 rounded-sm placeholder:text-xs outline-none border-blue-500 border-2' type="text" />
      </div>}
      <div className='flex-1 flex flex-wrap gap-3 p-4 '>
      {
        (filteredItems?.length > 0 ? filteredItems :  cryptoNewslist)?.map((item, index) => (
          <a href={item?.url} target='_blank' key={index} className='w-[300px] h-[300px] bg-gray-100 transition-all flex flex-col justify-between duration-200 ease-out shadow-sm hover:shadow-lg p-4'>
            
            <div className='flex  justify-between'>
              <p className='font-semibold '> {item?.name}</p>
              <img className='w-[100px] h-[100px]' src={item?.image?.thumbnail?.contentUrl} alt="" />
            </div>

            <p className='text-sm text-gray-500 font-medium'>{item?.description.slice(0, 100)}...</p>

            <div className='flex items-center justify-between gap-3'>
              <img className='h-10 w-10 rounded-full' src={item?.provider[0]?.image?.thumbnail?.contentUrl} alt="" />
              <p className='text-xs text-gray-500'>{moment(item?.datePublished).startOf('ss').fromNow()}</p>
            </div>

          </a>
        ))
      }
      </div>
      
    </div>
    </div>
  )
}

export default News