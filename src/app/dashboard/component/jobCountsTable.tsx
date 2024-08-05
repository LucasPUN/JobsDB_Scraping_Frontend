import React, { useState, ChangeEvent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  Grid,
} from '@mui/material';

import { aggregateJobCountsByDate } from "@/app/dashboard/component/aggregateJobCounts";
import JobCountsChart from "@/app/dashboard/component/jobCountsChart";
import {JobCount} from "@/api/jobCountApi"; // Adjust the path accordingly

type Order = 'asc' | 'desc';

type JobCountsTableProps = {
  jobCounts: JobCount[];
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const JobCountsTable: React.FC<JobCountsTableProps> = ({ jobCounts }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof JobCount>('SalaryRange');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleRequestSort = (property: keyof JobCount) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobCounts = jobCounts.filter((jobCount) =>
    Object.values(jobCount).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const aggregatedJobCounts = aggregateJobCountsByDate(filteredJobCounts);

  // Get the headers of the table with non-zero values
  const nonZeroHeaders = [
    'date',
    'SalaryRange',
    'Total',
    'Java',
    'Python',
    'JavaScript',
    'TypeScript',
    'ReactJS',
    'VueJs',
    'Spring',
    'NodeJS',
    'MySQL',
    'NoSQL',
  ].filter(header => filteredJobCounts.some(jobCount => jobCount[header as keyof JobCount] !== 0));

  return (
    <Paper>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {nonZeroHeaders.map((headCell) => (
                    <TableCell key={headCell}>
                      <TableSortLabel
                        active={orderBy === headCell}
                        direction={orderBy === headCell ? order : 'asc'}
                        onClick={() => handleRequestSort(headCell as keyof JobCount)}
                      >
                        {headCell}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(filteredJobCounts, getComparator(order, orderBy)).map((jobCount) => (
                  <TableRow key={jobCount._id}>
                    {nonZeroHeaders.map(header => (
                      <TableCell key={header}>
                        {header === 'date' ? new Date(jobCount[header as keyof JobCount] as string).toLocaleDateString() : jobCount[header as keyof JobCount]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobCountsTable;
