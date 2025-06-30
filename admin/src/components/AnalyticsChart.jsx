import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const AnalyticsChart = ({ orders = [], revenue = [] }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December' ];

  const orderData = {
    labels: months,
    datasets: [
      {
        label: 'Orders',
        data: orders,
        backgroundColor: '#f49521',
        borderRadius: 5,
      },
    ],
  };

  const revenueData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue (Rs)',
        data: revenue,
        borderColor: '#00e676',
        backgroundColor: '#00e67633',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } },
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: '#333' } },
      y: { ticks: { color: 'white' }, grid: { color: '#333' } },
    },
  };

  return (
    <div className="mt-10 grid md:grid-cols-2 gap-6">
      <div className="bg-[#1f1f1f] p-5 rounded-lg">
        <h3 className="text-white font-bold mb-2">Monthly Orders</h3>
        <Bar data={orderData} options={options} />
      </div>

      <div className="bg-[#1f1f1f] p-5 rounded-lg">
        <h3 className="text-white font-bold mb-2">Monthly Revenue</h3>
        <Line data={revenueData} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsChart;
