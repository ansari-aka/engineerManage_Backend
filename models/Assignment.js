const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  engineer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Engineer',
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  hoursAssigned: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  feedback: {
    type: String, // Feedback from the Project Manager or Engineer
  },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
