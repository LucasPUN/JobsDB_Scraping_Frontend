import {JobCount} from "@/api/jobCountApi";

const API_BASE_URL = 'https://jobsdb-scraping-nodejs.onrender.com/v1';

export const fetchJobDetails = async (): Promise<JobCount[]> => {
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