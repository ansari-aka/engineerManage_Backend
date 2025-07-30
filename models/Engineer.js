const mongoose = require('mongoose');

const engineerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Developer', 'Tester', 'Project Manager', 'Designer'], // Add more roles as needed
    required: true,
  },
  skills: [String], // List of skills like "JavaScript", "React", etc.
  capacity: {
    type: Number, // Number of hours they are available per week
    required: true,
  },
  assignedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Links to the Project model
  }],
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
  },
});

const Engineer = mongoose.model('Engineer', engineerSchema);

module.exports = Engineer;
