'use client';

import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useEffect, useState} from "react";
import {fetchJobCounts, JobCount, JobCount as JobCountType} from '../../api/jobCountApi'
import JobCountsTable from "@/app/dashboard/component/jobCountsTable";
import JobCountsChart from "@/app/dashboard/component/jobCountsChart";
import {aggregateJobCountsByDate} from "@/app/dashboard/component/aggregateJobCounts";
import JobFilter from "@/app/dashboard/component/seacrhBox";
import {AppBar} from "@mui/material";


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Max & Lucas
      {'  '}
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
  const [searchQuery, setSearchQuery] = useState<string>('');


  const filteredJobCounts = jobCounts.filter((jobCount) =>
    Object.values(jobCount).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );



  const aggregatedJobCounts = aggregateJobCountsByDate(filteredJobCounts);
  console.log(aggregatedJobCounts);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getJobCounts = async () => {
    try {
      const data = await fetchJobCounts();
      setJobCounts(data);
      setLoading(false);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    getJobCounts();
  }, []);

  return (
    <>
      <AppBar position="absolute">
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{flexGrow: 1}}
        >
          Dashboard
        </Typography>
      </AppBar>


      <Box padding={5} sx={{display: 'flex', width: '90vw'}}>

        <Grid container spacing={1}>

          <JobFilter/>


          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>
                <JobCountsTable jobCounts={jobCounts}/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>
                <JobCountsChart aggregatedJobCounts={aggregatedJobCounts}/>
              </Paper>
            </Grid>
          </Grid>

        </Grid>
      </Box>
      <Copyright sx={{pt: 4}}/>


    </>
  );

}

