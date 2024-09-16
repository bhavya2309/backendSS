import Activity from '../models/activityModel.js';

// Controller to handle form submission
const submitForm = async (req, res) => {
  const { type, title, date, description, attendees } = req.body;

  try {
    // Create a new activity record
    const newActivity = new Activity({
      type,
      title,
      date,
      description,
      attendees,
    });

    // Save the activity in the database
    await newActivity.save();

    // Respond with success
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Server error, please try again' });
  }
};

// Export the controller function as default
export default submitForm;
