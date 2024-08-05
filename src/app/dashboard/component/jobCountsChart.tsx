// JobCountsChart.tsx
import React, {ChangeEvent, useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {JobCount} from "@/api/jobCountApi";
import {aggregateJobCountsByDate} from "@/app/dashboard/component/aggregateJobCounts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type JobCountsChartProps = {
  aggregatedJobCounts: { date: string; total: number }[];
};



const JobCountsChart: React.FC<JobCountsChartProps> = ({ aggregatedJobCounts }) => {



  const data = {
    labels: aggregatedJobCounts.map((jobCount) => jobCount.date),
    datasets: [
      {
        label: 'Total Job Counts',
        data: aggregatedJobCounts.map((jobCount) => jobCount.total),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Job Counts Over Time',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default JobCountsChart;

