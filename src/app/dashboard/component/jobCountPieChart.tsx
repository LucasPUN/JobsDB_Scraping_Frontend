import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { JobCount } from "@/api/jobCountApi"; // Adjust the path accordingly

type JobCountsPieChartProps = {
  jobCounts: JobCount[];
  selectedDate: string;
};

const JobCountsPieChart: React.FC<JobCountsPieChartProps> = ({ jobCounts, selectedDate }) => {
  let filteredData: JobCount | null = null;

  if (selectedDate === 'ALL') {
    // Aggregate totals for all dates
    const aggregatedTotals: JobCount = jobCounts.reduce((acc, jobCount) => {
      Object.keys(jobCount).forEach((key) => {
        if (key !== '_id' && key !== 'date') {
          acc[key as keyof JobCount] = (acc[key as keyof JobCount] || 0) + (jobCount[key as keyof JobCount] || 0);
        }
      });
      return acc;
    }, {} as JobCount);
    filteredData = aggregatedTotals;
  } else {
    filteredData = jobCounts.find(jobCount => jobCount.date === selectedDate) || null;
  }

  if (!filteredData) return null;

  // Prepare pie chart data
  const pieChartData = [
    { name: 'Java', value: filteredData.Java },
    { name: 'Python', value: filteredData.Python },
    { name: 'JavaScript', value: filteredData.JavaScript },
    { name: 'TypeScript', value: filteredData.TypeScript },
    { name: 'ReactJS', value: filteredData.ReactJS },
    { name: 'VueJs', value: filteredData.VueJs },
    { name: 'Spring', value: filteredData.Spring },
    { name: 'NodeJS', value: filteredData.NodeJS },
    { name: 'MySQL', value: filteredData.MySQL },
    { name: 'NoSQL', value: filteredData.NoSQL },
  ].filter(item => item.value > 0); // Remove items with 0 value

  // Define colors for pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5722', '#FF4081', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
        >
          {pieChartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default JobCountsPieChart;
