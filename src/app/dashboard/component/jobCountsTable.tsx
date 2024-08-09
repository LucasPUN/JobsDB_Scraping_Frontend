import React, { useState, ChangeEvent } from 'react';
import {
  Paper,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import JobCountsPieChart from "./jobCountPieChart"; // Adjust the path accordingly
import { JobCount } from "@/api/jobCountApi"; // Adjust the path accordingly

type JobCountsTableProps = {
  jobCounts: JobCount[];
};

const JobCountsTable: React.FC<JobCountsTableProps> = ({ jobCounts }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('ALL'); // Default to 'ALL'

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedDate(event.target.value as string);
  };

  // Filter job counts based on search query
  const filteredJobCounts = jobCounts.filter((jobCount) =>
    Object.values(jobCount).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Get unique dates from the filtered job counts
  const uniqueDates = Array.from(new Set(filteredJobCounts.map(jobCount => jobCount.date)));

  return (
    <Paper>
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-date-label">Select Date</InputLabel>
        <Select
          labelId="select-date-label"
          value={selectedDate}
          onChange={handleDateChange}
          label="Select Date"
        >
          <MenuItem value="ALL">All Dates</MenuItem>
          {uniqueDates.map(date => (
            <MenuItem key={date} value={date}>
              {new Date(date).toLocaleDateString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <JobCountsPieChart jobCounts={filteredJobCounts} selectedDate={selectedDate} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobCountsTable;
