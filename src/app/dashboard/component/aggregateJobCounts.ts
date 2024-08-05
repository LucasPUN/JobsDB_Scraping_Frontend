// utils/aggregateJobCounts.ts

import {JobCount} from "@/api/jobCountApi";

export const aggregateJobCountsByDate = (jobCounts: JobCount[]) => {
  const aggregatedData: { [date: string]: number } = {};

  jobCounts.forEach((jobCount) => {
    const date = new Date(jobCount.date).toLocaleDateString();
    if (!aggregatedData[date]) {
      aggregatedData[date] = 0;
    }
    aggregatedData[date] += jobCount.Total;
  });

  return Object.entries(aggregatedData).map(([date, total]) => ({
    date,
    total,
  }));
};
