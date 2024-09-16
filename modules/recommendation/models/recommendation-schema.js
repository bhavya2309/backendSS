import mongoose from 'mongoose';

// Define the schema for storing interaction data
const interactionSchema = new mongoose.Schema({
  userId: { type: Number, required: true },   // Unique identifier for the user
  pizzaId: { type: Number, required: true },  // Unique identifier for the pizza
  action: { type: String, required: true },   // Type of action (e.g., 'view', 'order')
  timestamp: { type: Date, default: Date.now } // When the action occurred
});

// Create the model from the schema
const Interaction = mongoose.model('Interaction', interactionSchema);

// Export the model for use in other parts of the application
export default Interaction;
