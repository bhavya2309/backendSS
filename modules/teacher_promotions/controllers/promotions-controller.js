import Employee from '../models/promotions-model.js';
import axios from 'axios';

// Function to fetch employee data from the database and send a POST request to Python API
export const getEmployeePrediction = async (req, res) => {
  try {
    // Fetch employee data by ID from the database (adjust query as needed)
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Send the fetched data to the Python API on Render
    const pythonApiResponse = await axios.post('https://sih24-n6yt.onrender.com/predict', {
      no_of_trainings: employee.no_of_trainings,
      age: employee.age,
      previous_year_rating: employee.previous_year_rating,
      length_of_service: employee.length_of_service,
      avg_training_score: employee.avg_training_score,
      education: employee.education,
      KPIs_met: employee.KPIs_met,
      awards_won: employee.awards_won
    });

    // Return the result from the Python API to the frontend
    return res.status(200).json(pythonApiResponse.data);
  } catch (error) {
    console.error('Error fetching employee or calling Python API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
