// src/services/api.js
import axios from 'axios';

const API_URL = '/api';  // This will be proxied to your backend

// Example API functions for Todo operations
export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (newTodo) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, newTodo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};
