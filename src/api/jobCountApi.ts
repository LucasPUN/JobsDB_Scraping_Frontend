
const API_BASE_URL = 'https://jobsdb-scraping-nodejs.onrender.com/v1';

export type JobCount = {
  _id: string;
  SalaryRange: string;
  Total: number;
  javaCount: number;
  pythonCount: number;
  javaScriptCount: number;
  typeScriptCount: number;
  reactJsCount: number;
  vueJsCount: number;
  springCount: number;
  nodeJsCount: number;
  mySqlCount: number;
  noSqlCount: number;
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