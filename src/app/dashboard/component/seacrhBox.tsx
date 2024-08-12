import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Select, MenuItem, TextField } from '@mui/material';
import JobTable from "@/app/dashboard/component/jobTable";

interface JobDetail {
  _id: string;
  date: string;
  salaryRange: string;
  id: string;
  jobTitle: string;
  jobCompany: string;
  jobLocation: string;
  jobSubClassification: string;
  jobClassification: string;
  jobListingDate: string;
  jobAdDetails: string;
}

const JobFilter: React.FC = () => {
  const [minSalary, setMinSalary] = useState<string>('15000');
  const [maxSalary, setMaxSalary] = useState<string>('120000-');
  const [jobSubClassifications, setJobSubClassifications] = useState<string[]>([]);
  const [jobSubClassification, setJobSubClassification] = useState('');
  const [startDate, setStartDate] = useState<string>(''); // 新增开始日期状态
  const [endDate, setEndDate] = useState<string>(''); // 新增结束日期状态
  const [jobs, setJobs] = useState<JobDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const buildQueryString = (params: { [key: string]: string }) => {
    return new URLSearchParams(params).toString();
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryString = buildQueryString({
        salaryRange: `${minSalary}-${maxSalary}`,
        ...(jobSubClassification && { jobSubClassification }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      });

      const response = await fetch(`http://localhost:3000/v1/job-detail-list?${queryString}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: JobDetail[] = await response.json();

      // Sort the jobs by date in descending order
      const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setJobs(sortedData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchJobs();
  }, [minSalary, maxSalary, jobSubClassification, startDate, endDate]);

  useEffect(() => {
    const fetchJobSubClassifications = async () => {
      try {
        const response = await fetch('http://localhost:3000/v1/job-detail-list');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // @ts-ignore
        const uniqueJobSubClassifications = [...new Set(data.map((job: JobDetail) => job.jobSubClassification))];
        setJobSubClassifications(uniqueJobSubClassifications);
      } catch (error) {
        console.error('Failed to fetch job sub-classifications:', error);
      }
    };
    fetchJobSubClassifications();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', gap: 2 , justifyContent: 'center'}}>
        Job List
      </Typography>

      <Box mb={4} sx={{ display: 'flex', gap: 2 , justifyContent: 'center' }}>
        <Box>
          <Typography variant="subtitle1">Salary Range：</Typography>
          <Select
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            displayEmpty
            sx={{ mr: 2 }}
          >
            <MenuItem value="15000">15000</MenuItem>
            <MenuItem value="17000">17000</MenuItem>
            <MenuItem value="20000">20000</MenuItem>
            <MenuItem value="25000">25000</MenuItem>
            <MenuItem value="30000">30000</MenuItem>
            <MenuItem value="35000">35000</MenuItem>
            <MenuItem value="40000">40000</MenuItem>
            <MenuItem value="50000">50000</MenuItem>
            <MenuItem value="60000">60000</MenuItem>
            <MenuItem value="80000">80000</MenuItem>
            <MenuItem value="120000">120000</MenuItem>
            <MenuItem value="120000-">120000-</MenuItem>
          </Select>
          <Select
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            displayEmpty
          >
            <MenuItem value="15000">15000</MenuItem>
            <MenuItem value="17000">17000</MenuItem>
            <MenuItem value="20000">20000</MenuItem>
            <MenuItem value="25000">25000</MenuItem>
            <MenuItem value="30000">30000</MenuItem>
            <MenuItem value="35000">35000</MenuItem>
            <MenuItem value="40000">40000</MenuItem>
            <MenuItem value="50000">50000</MenuItem>
            <MenuItem value="60000">60000</MenuItem>
            <MenuItem value="80000">80000</MenuItem>
            <MenuItem value="120000">120000</MenuItem>
            <MenuItem value="120000-">120000-</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography variant="subtitle1">Type：</Typography>
          <Select
            value={jobSubClassification}
            onChange={(e) => setJobSubClassification(e.target.value)}
            displayEmpty
            sx={{ mr: 2 }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {jobSubClassifications.map((subClass, index) => (
              <MenuItem key={index} value={subClass}>
                {subClass}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Typography variant="subtitle1">Start Date：</Typography>
          <TextField
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1">End Date：</Typography>
          <TextField
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error.message}</Typography>}

      <Box sx={{ width: '90vw', maxHeight: 600, overflowY: 'auto' }}>
        <JobTable jobs={jobs} />
      </Box>
    </Box>
  );
};

export default JobFilter;
