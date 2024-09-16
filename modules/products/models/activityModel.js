import mongoose from 'mongoose';

// Define the schema for the faculty activity
const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendees: {
    type: Number,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
