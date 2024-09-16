import { exec } from 'child_process';
import Interaction from '../models/recommendation-schema.js';

// Function to add recommendations to the database
export const addRecommendations = async (req, res) => {
  const { userId, recommendedPizzas } = req.body;

  // Validate input
  if (!userId || !recommendedPizzas || !Array.isArray(recommendedPizzas)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    // Iterate through recommended pizzas and save each recommendation
    for (let pizza of recommendedPizzas) {
      const { pizzaId, score } = pizza;

      // Check if the necessary fields are present
      if (!pizzaId || score === undefined) {
        return res.status(400).json({ error: 'Missing pizzaId or score in recommendedPizzas' });
      }

      // Create a new interaction entry as a recommendation
      const newInteraction = new Interaction({
        userId,
        pizzaId,
        action: 'recommendation', // Mark this as a recommendation action
        timestamp: new Date(),    // When the recommendation was made
      });

      // Save the interaction to the database
      await newInteraction.save();
    }

    res.status(201).json({ message: 'Recommendations added successfully' });
  } catch (error) {
    console.error(`Error adding recommendations: ${error.message}`);
    res.status(500).json({ error: 'Server Error' });
  }
};


export const getRecommendations = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
  
    try {
      const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
      exec(`${pythonCommand} recommend.py ${userId}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).json({ error: 'Server Error' });
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return res.status(500).json({ error: 'Server Error' });
        }
  
        try {
          const recommendations = JSON.parse(stdout);
          res.json(recommendations);
        } catch (parseError) {
          console.error(`Parse Error: ${parseError.message}`);
          res.status(500).json({ error: 'Server Error' });
        }
      });
    } catch (err) {
      console.error(`Error: ${err.message}`);
      res.status(500).json({ error: 'Server Error' });
    }
  };