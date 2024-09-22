import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Select, MenuItem, TextField, CircularProgress } from '@mui/material';
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
  const [minSalary, setMinSalary] = useState<string>('0');
  const [maxSalary, setMaxSalary] = useState<string>('120000');
  const [jobSubClassifications, setJobSubClassifications] = useState<string[]>([]);
  const [jobSubClassification, setJobSubClassification] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
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

      const response = await fetch(`https://jobsdb-scraping-nodejs.onrender.com/v1/job-detail-list?${queryString}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: JobDetail[] = await response.json();
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
        const response = await fetch('https://jobsdb-scraping-nodejs.onrender.com/v1/job-detail-list');
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
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>
          Job List
        </Typography>

        <Grid container spacing={2} mb={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1">Salary Range:</Typography>
            <Select
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                fullWidth
            >
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="11000">11000</MenuItem>
              <MenuItem value="14000">14000</MenuItem>
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
            </Select>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1">Max Salary:</Typography>
            <Select
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                fullWidth
            >
              <MenuItem value="11000">11000</MenuItem>
              <MenuItem value="14000">14000</MenuItem>
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
            </Select>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1">Type:</Typography>
            <Select
                value={jobSubClassification}
                onChange={(e) => setJobSubClassification(e.target.value)}
                fullWidth
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
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1">Start Date:</Typography>
            <TextField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1">End Date:</Typography>
            <TextField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}>
              <CircularProgress />
            </Box>
        )}
        {error && <Typography color="error">Error: {error.message}</Typography>}

        <Box sx={{ width: '100%', maxWidth: '90vw', maxHeight: 600, overflowY: 'auto', margin: '0 auto' }}>
          <JobTable jobs={jobs} />
        </Box>
      </Box>
  );
};

export default JobFilter;
