import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  no_of_trainings: Number,
  age: Number,
  previous_year_rating: Number,
  length_of_service: Number,
  avg_training_score: Number,
  education: String,
  KPIs_met: Boolean,
  awards_won: Boolean
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
