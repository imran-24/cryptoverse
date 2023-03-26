import millify from 'millify'
import React from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LineChart = ({coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }


  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  console.log(coinTimestamp)
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

 
const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}
  
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between'>
            <h2 className='text-blue-500 text-2xl '>{coinName} Price Chart</h2>
            <div className='flex space-x-4 text-sm font-semibold'>
                <p>{coinHistory?.data?.change} %</p>
                <p>current {coinName} price: ${millify(currentPrice)}</p>
            </div>
        </div>
        <div className='w-full'>
        <Line data={data} options={options} />
        </div>
    </div>
  )
}

export default LineChart