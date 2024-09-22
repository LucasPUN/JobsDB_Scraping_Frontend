'use client';

import * as React from 'react';
import {AppBar, Box, Container, Divider, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useEffect, useState} from "react";
import {fetchJobCounts, JobCount} from '../../api/jobCountApi';
import JobCountsTable from "@/app/dashboard/component/jobCountsTable";
import JobCountsChart from "@/app/dashboard/component/jobCountsChart";
import {aggregateJobCountsByDate} from "@/app/dashboard/component/aggregateJobCounts";
import JobFilter from "@/app/dashboard/component/seacrhBox";
import LanguageCountsChart from "@/app/dashboard/component/languageCountsChart";

function Copyright(props: any) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        Max & Lucas
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [jobCounts, setJobCounts] = useState<JobCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const aggregatedJobCounts = aggregateJobCountsByDate(jobCounts);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getJobCounts = async () => {
    try {
      const data = await fetchJobCounts();
      setJobCounts(data);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobCounts();
  }, []);

  return (
      <>
        {/* AppBar */}
        <AppBar position="static" sx={{ mb: 3 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            {/* Job Filter */}
            <Grid item xs={12}>
              <JobFilter />
            </Grid>

            {/* Job Counts Table */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Job Counts by Date
                </Typography>
                <JobCountsTable jobCounts={jobCounts} />
              </Paper>
            </Grid>

            {/* Language Counts Chart */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Language Counts
                </Typography>
                <LanguageCountsChart languageJobCounts={jobCounts} />
              </Paper>
            </Grid>

            {/* Job Counts Chart */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', marginTop: 5}}>
                <Typography variant="h6" gutterBottom>
                  Aggregated Job Counts Chart
                </Typography>
                <JobCountsChart aggregatedJobCounts={aggregatedJobCounts} />
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ pt: 4 }}>
          <Copyright />
        </Box>
      </>
  );
}
