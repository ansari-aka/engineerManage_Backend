const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Engineer', // Links to Engineer model
  }],
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  capacityRequired: {
    type: Number, // Total hours required for the project
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
