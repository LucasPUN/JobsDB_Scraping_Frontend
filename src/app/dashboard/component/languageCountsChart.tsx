import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LanguageJobCount = {
  _id: string;
  SalaryRange: string;
  Total: number;
  Java: number;
  Python: number;
  JavaScript: number;
  TypeScript: number;
  ReactJS: number;
  VueJs: number;
  Spring: number;
  NodeJS: number;
  MySQL: number;
  NoSQL: number;
  date: string;
  [key: string]: number | string | undefined;
};

type LanguageCountsChartProps = {
  languageJobCounts: LanguageJobCount[];
};

const LanguageCountsChart: React.FC<LanguageCountsChartProps> = ({ languageJobCounts }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setSelectedLanguage(event.target.value as string);
  };

  const languages = languageJobCounts.length > 0
    ? Object.keys(languageJobCounts[0]).filter(key => !['date', '_id', 'SalaryRange', 'Total'].includes(key))
    : [];

  // 合并相同日期的数据
  const mergedLanguageJobCounts = languageJobCounts.reduce((acc, jobCount) => {
    const existingEntry = acc.find(item => item.date === jobCount.date);
    if (existingEntry) {
      languages.forEach(language => {
        existingEntry[language as keyof LanguageJobCount] =
          ((existingEntry[language as keyof LanguageJobCount] || 0) as number) +
          ((jobCount[language as keyof LanguageJobCount] || 0) as number);
      });
      existingEntry.Total = (existingEntry.Total || 0) + (jobCount.Total || 0);
    } else {
      acc.push({ ...jobCount });
    }
    return acc;
  }, [] as LanguageJobCount[]);

  const sortedLanguageJobCounts = mergedLanguageJobCounts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sortedLanguageJobCounts.map((jobCount) => new Date(jobCount.date).toLocaleDateString()),
    datasets: selectedLanguage === 'ALL'
      ? languages.map((language) => ({
        label: language,
        data: sortedLanguageJobCounts.map((jobCount) => jobCount[language as keyof LanguageJobCount] || 0),
        borderColor: getRandomColor(),
        fill: false,
      }))
      : [{
        label: selectedLanguage,
        data: sortedLanguageJobCounts.map((jobCount) => jobCount[selectedLanguage as keyof LanguageJobCount] || 0),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        fill: false,
      }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Language Counts' Trend (${selectedLanguage})`,
      },
    },
  };

  function getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-language-label">Select Language</InputLabel>
        <Select
          labelId="select-language-label"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          label="Select Language"
        >
          <MenuItem value="ALL">All Languages</MenuItem>
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Line data={data} options={options} />
    </>
  );
};

export default LanguageCountsChart;
