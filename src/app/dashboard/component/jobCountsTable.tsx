import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material';
import { JobCount } from './api/jobCountApi'; // Adjust the path accordingly

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

  const handleRequestSort = (property: keyof JobCount) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {[
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
            ].map((headCell) => (
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
          {stableSort(jobCounts, getComparator(order, orderBy)).map((jobCount) => (
            <TableRow key={jobCount._id}>
              <TableCell>{new Date(jobCount.date).toLocaleDateString()}</TableCell>
              <TableCell>{jobCount.SalaryRange}</TableCell>
              <TableCell>{jobCount.Total}</TableCell>
              <TableCell>{jobCount.Java}</TableCell>
              <TableCell>{jobCount.Python}</TableCell>
              <TableCell>{jobCount.JavaScript}</TableCell>
              <TableCell>{jobCount.TypeScript}</TableCell>
              <TableCell>{jobCount.ReactJS}</TableCell>
              <TableCell>{jobCount.VueJs}</TableCell>
              <TableCell>{jobCount.Spring}</TableCell>
              <TableCell>{jobCount.NodeJS}</TableCell>
              <TableCell>{jobCount.MySQL}</TableCell>
              <TableCell>{jobCount.NoSQL}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobCountsTable;
