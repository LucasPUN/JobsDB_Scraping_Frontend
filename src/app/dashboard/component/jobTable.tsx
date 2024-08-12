import React, {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import Link from "@mui/material/Link";

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

interface JobTableProps {
  jobs: JobDetail[];
}

const JobTable: React.FC<JobTableProps> = ({jobs}) => {
  const [selectedJob, setSelectedJob] = useState<JobDetail | null>(null);

  const handleRowClick = (job: JobDetail) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Sub Classification</TableCell>
              <TableCell>Salary Range</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id} onClick={() => handleRowClick(job)} style={{cursor: 'pointer'}}>
                <TableCell>{new Date(job.date).toLocaleDateString()}</TableCell>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>{job.jobSubClassification}</TableCell>
                <TableCell>{job.salaryRange}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedJob} onClose={handleClose}>
        {selectedJob && (
          <>
            <DialogTitle>{selectedJob.jobTitle}</DialogTitle>
            <DialogContent>
              <Typography variant="body2" component="p">
                <strong>Company:</strong> {selectedJob.jobCompany}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Location:</strong> {selectedJob.jobLocation}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Salary:</strong> {selectedJob.salaryRange}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Date:</strong> {new Date(selectedJob.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Classification:</strong> {selectedJob.jobSubClassification}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Link href={`https://hk.jobsdb.com/job/${selectedJob.id}`} target="_blank" rel="noopener">
                  View Job Posting
                </Link>
              </Typography>
              <Typography variant="body2" component="p">
                Details: {selectedJob.jobAdDetails}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default JobTable;
