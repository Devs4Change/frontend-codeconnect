import axios from 'axios';

const API_BASE_URL = 'https://code-connect-api.onrender.com';

export const fetchModules = async (courseType) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modules/${courseType}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${courseType} modules:`, error);
    throw error;
  }
}; 