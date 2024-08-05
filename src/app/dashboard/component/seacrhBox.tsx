import React, { useState, useEffect } from 'react';

import { Grid, Box, Typography, Select, MenuItem } from '@mui/material';
import JobCard from "@/app/dashboard/component/jobCard";

// 定义职位数据接口
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
  const [maxSalary, setMaxSalary] = useState<string>('25000');
  const [jobs, setJobs] = useState<JobDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // 工具函数：将查询参数对象转换为查询字符串
  const buildQueryString = (params: { [key: string]: string }) => {
    return new URLSearchParams(params).toString();
  };

  // 获取职位列表的函数
  const fetchJobs = async () => {
    setLoading(true);
    try {
      // 构建查询参数
      const queryString = buildQueryString({
        salaryRange: `${minSalary}-${maxSalary}`,
      });

      // 发起 GET 请求
      const response = await fetch(`http://localhost:3000/v1/job-detail-list?${queryString}`, {
        method: 'GET',
      });

      // 确保请求成功
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 解析 JSON 响应
      const data: JobDetail[] = await response.json();

      // 处理响应数据
      setJobs(data);
    } catch (err) {
      setError(err as Error); // 确保错误被正确处理
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [minSalary, maxSalary]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Job List
      </Typography>

      <Box mb={3}>
        <Typography variant="subtitle1">Salary Range：</Typography>
        <Select
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': '选择最低工资' }}
          sx={{ mr: 2 }}
        >
          <MenuItem value="15000">15000</MenuItem>
          <MenuItem value="17000">17000</MenuItem>
          <MenuItem value="20000">20000</MenuItem>
          <MenuItem value="25000">25000</MenuItem>
        </Select>
        <Select
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': '选择最高工资' }}
        >
          <MenuItem value="15000">15000</MenuItem>
          <MenuItem value="17000">17000</MenuItem>
          <MenuItem value="20000">20000</MenuItem>
          <MenuItem value="25000">25000</MenuItem>
        </Select>
      </Box>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error.message}</Typography>}

      <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default JobFilter;
