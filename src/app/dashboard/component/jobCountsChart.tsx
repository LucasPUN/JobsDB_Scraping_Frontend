import React, { useState, ChangeEvent } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { JobCount } from '@/api/jobCountApi';
import { aggregateJobCountsByDate } from '@/app/dashboard/component/aggregateJobCounts';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type JobCountsChartProps = {
  aggregatedJobCounts: { date: string; total: number; salaryRange: string }[];
};

const JobCountsChart: React.FC<JobCountsChartProps> = ({ aggregatedJobCounts }) => {
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string>('ALL');

  // Handle salary range change
  const handleSalaryRangeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSalaryRange(event.target.value as string);
  };

  // Filter the job counts based on the selected salary range
  const filteredJobCounts = selectedSalaryRange === 'ALL'
    ? aggregatedJobCounts
    : aggregatedJobCounts.filter((jobCount) => jobCount.salaryRange === selectedSalaryRange);

  const data = {
    labels: filteredJobCounts.map((jobCount) => jobCount.date),
    datasets: [
      {
        label: 'Total Job Counts',
        data: filteredJobCounts.map((jobCount) => jobCount.total),
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

  // Get unique salary ranges
  const uniqueSalaryRanges = Array.from(new Set(aggregatedJobCounts.map((jobCount) => jobCount.salaryRange)));

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-salary-range-label">Select Salary Range</InputLabel>
        <Select
          labelId="select-salary-range-label"
          value={selectedSalaryRange}
          onChange={handleSalaryRangeChange}
          label="Select Salary Range"
        >
          <MenuItem value="ALL">All Salary Ranges</MenuItem>
          {uniqueSalaryRanges.map((salaryRange) => (
            <MenuItem key={salaryRange} value={salaryRange}>
              {salaryRange}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Line data={data} options={options} />
    </>
  );
};

export default JobCountsChart;
