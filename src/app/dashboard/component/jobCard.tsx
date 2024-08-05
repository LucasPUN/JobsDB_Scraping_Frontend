import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

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

interface JobCardProps {
  job: JobDetail;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {job.jobTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Company: {job.jobCompany}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
         Loaction : {job.jobLocation}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Salary: {job.salaryRange}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Date: {new Date(job.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Classification: {job.jobClassification}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Details: {job.jobAdDetails}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobCard;
