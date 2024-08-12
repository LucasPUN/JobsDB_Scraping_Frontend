import React, { useState, ChangeEvent, ReactNode } from 'react';
import {
  Paper,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import JobCountsPieChart from './jobCountPieChart'; // Adjust the path accordingly
import { JobCount } from '@/api/jobCountApi'; // Adjust the path accordingly

type JobCountsTableProps = {
  jobCounts: JobCount[];
};

const JobCountsTable: React.FC<JobCountsTableProps> = ({ jobCounts }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('ALL');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setSelectedDate(event.target.value as string);
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  // Filter job counts based on search query and date range
  const filteredJobCounts = jobCounts.filter((jobCount) => {
    const matchesSearchQuery = Object.values(jobCount).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    const jobDate = new Date(jobCount.date);
    const isWithinDateRange =
      (!startDate || new Date(startDate) <= jobDate) &&
      (!endDate || jobDate <= new Date(endDate));

    return matchesSearchQuery && isWithinDateRange;
  });

  // Get unique dates from the filtered job counts
  const uniqueDates = Array.from(new Set(filteredJobCounts.map((jobCount) => jobCount.date)));

  return (
    <Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <JobCountsPieChart jobCounts={filteredJobCounts} selectedDate={selectedDate} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobCountsTable;
