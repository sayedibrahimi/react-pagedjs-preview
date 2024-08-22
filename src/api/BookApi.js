import axios from "axios";

const API_URL = "http://localhost:3001"; // Update with your API URL

const fetchBookById = async (bookId) => {
  try {
    const response = await axios.get(`${API_URL}/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${bookId}:`, error);
    throw error;
  }
};

export { fetchBookById };
