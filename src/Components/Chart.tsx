import React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartProps } from '../Interfaces/PropInterfaces';

ChartJS.register(...registerables);

const Chart = ({interest, balance}: ChartProps) => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            position: 'bottom' as const,
            display: true,
            text: 'Year',
          },
        },
    }

    const data = {
        labels: Array.from({length: interest.length}, (_, i) => i + 1),
        datasets: [
          {
            label: 'Accured Interest',
            data: interest,
            backgroundColor: 'rgba(127, 180, 59, 0.8)',
          },
          {
            label: 'Balance',
            data:  balance,
            backgroundColor: 'rgba(24, 118, 242, 0.8)',
          },
        ],
    }

    return (
        <Bar options={options} data={data} />
    )
}

export default Chart