import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Handle error, e.g., show error message or log it
    console.error('Error during registration:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

//Login User
const login = async (userData) => {
    try {
      const response = await axios.post(API_URL + 'login', userData);
  
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
  
      return response.data;
    } catch (error) {
      // Handle error, e.g., show error message or log it
      console.error('Error during registration:', error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  };

//Logout

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
  register,logout, login
};

export default authService;
