
const API_BASE_URL = 'http://localhost:3000/v1';

export type JobCount = {
  _id: string;
  SalaryRange: string;
  Total: number;
  Java: number;
  Python: number;
  JavaScript: number;
  TypeScript: number;
  ReactJS: number;
  VueJs: number;
  Spring: number;
  NodeJS: number;
  MySQL: number;
  NoSQL: number;
  date: string;
};

export const fetchJobCounts = async (): Promise<JobCount[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/job-count`,{
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch job counts:", error);
    throw error;
  }
};