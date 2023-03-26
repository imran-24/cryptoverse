import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCryptosDetailsQuery, useGetCryptosHistoryQuery } from '../services/cryptoApi'
import { CurrencyDollarIcon, BoltIcon, TrophyIcon, ExclamationCircleIcon, HashtagIcon, CreditCardIcon, CircleStackIcon, CheckCircleIcon, StopCircleIcon} from '@heroicons/react/24/outline'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import LineChart from './LineChart'

const CryptoDetails = () => {

  const {coinId} = useParams()
  const [timePeriod, setTimePeriod] = useState('5y')
  const {data, isFetching} = useGetCryptosDetailsQuery(coinId)
  const {data : coinHistory} = useGetCryptosHistoryQuery({coinId, timePeriod})
  
  
  const cryptoDetails = data?.data?.coin
  if(isFetching) return '...Loading'

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <CurrencyDollarIcon className='h-4 w-4 text-black' /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <HashtagIcon className='h-4 w-4 text-black' /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.listedAt && millify(cryptoDetails?.listedAt)}`, icon: <BoltIcon className='h-4 w-4 text-black' /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <CurrencyDollarIcon className='h-4 w-4 text-black' /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyIcon className='h-4 w-4 text-black' /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <CircleStackIcon className='h-4 w-4 text-black' /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <CreditCardIcon className='h-4 w-4 text-black' /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckCircleIcon className='h-4 w-4 text-black' /> : <StopCircleIcon className='h-4 w-4 text-black' />, icon: <ExclamationCircleIcon className='h-4 w-4 text-black' /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleIcon className='h-4 w-4 text-black' /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleIcon className='h-4 w-4 text-black' /> },
  ];
  return (
    <div className='flex-1 p-10 mb-10'>

      <div className=' w-full'>
        
        <h2 className='text-3xl font-extrabold text-blue-500 text-center '> {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price</h2>
        <p className='text-gray-500 text-sm border-b  text-center pb-6'>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      
       
      </div>


      <div className='my-4'>
        <select onChange={(e)=> setTimePeriod(e.target?.value)} name="gender" className='w-[180px] bg-slate-100 border p-1 rounded-sm text-xs outline-none'>
          {
            time.map(item => (
              <option  value={item}>{item}</option>
            ))
          }
        </select>
      </div>

      <LineChart coinHistory={coinHistory} currentPrice = { cryptoDetails?.price} coinName = {cryptoDetails?.name} />


      <div className=' flex justify-evenly gap-10 flex-wrap w-full'>
        
        <div className='w-[400px]'>
          <h2 className='text-xl font-bold text-center '> {data?.data?.coin.name} Value Statics</h2>
          <p className='text-gray-500 text-xs  text-center'> An overview of the stats of {cryptoDetails.name}</p>
            
          {
            stats?.map(item => (
              <div className='flex justify-between border-b p-3'>
                <div className='flex items-center text-sm gap-2'>
                  {item.icon}
                  <p className='text-gray-500'>{item?.title}</p>
                </div>
                <p className='text-sm font-semibold'>{item?.value}</p>
              </div>
            ))
          }
          
        </div>

        <div className='w-[400px]'>
          <h2 className='text-xl font-bold text-center '> {data?.data?.coin.name} Value Statics</h2>
          <p className='text-gray-500 text-xs  text-center'> An overview of the stats of {cryptoDetails.name}</p>
            
          {
            genericStats?.map(item => (
              <div className='flex justify-between border-b p-3'>
                <div className='flex items-center text-sm gap-2'>
                  {item.icon}
                  <p className='text-gray-500'>{item?.title}</p>
                </div>
                <p className='text-sm font-semibold'>{item?.value}</p>
              </div>
            ))
          }
          
        </div>
      </div>

      <div className='mt-10'>
        <p className='text-lg text-blue-500 font-bold'>What is  {cryptoDetails?.name} ?<br />
        <p className='text-black text-base font-semibold'>{HTMLReactParser(cryptoDetails?.description)}</p>
        </p>
      </div>

      <div className='w-1/2 mt-10'>
          <h2 className='text-3xl text-blue-500 font-bold '> {cryptoDetails?.name} Links</h2>
            
          {
            cryptoDetails?.links?.map(link => (
              <div className='flex justify-between border-b p-3 hover:bg-gray-100'>                  
                <p className=''>{link?.type}</p>
                <a href={link?.url} className='text-sm text-blue-500 font-semibold'>{link?.url}</a>
              </div>
            ))
          }
          
        </div>
      
    </div>
  )
}

export default CryptoDetails