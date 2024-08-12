import {JobCount} from "@/api/jobCountApi";
export const aggregateJobCountsByDate = (jobCounts: JobCount[]) => {
  const aggregatedData: { [date: string]: { [salaryRange: string]: number } } = {};

  jobCounts.forEach((jobCount) => {
    const date = new Date(jobCount.date).toLocaleDateString();

    if (!aggregatedData[date]) {
      aggregatedData[date] = {};
    }

    if (!aggregatedData[date][jobCount.SalaryRange]) {
      aggregatedData[date][jobCount.SalaryRange] = 0;
    }

    aggregatedData[date][jobCount.SalaryRange] += jobCount.Total;
  });

  const result = [];
  for (const date in aggregatedData) {
    for (const salaryRange in aggregatedData[date]) {
      result.push({
        date,
        salaryRange,
        total: aggregatedData[date][salaryRange],
      });
    }
  }

  return result;
};
