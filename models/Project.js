const mongoose = require('mongoose');
const Engineer = require('./Engineer');

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

projectSchema.pre("findOneAndDelete", async function (next) {
  const project = await this.model.findOne(this.getQuery());
  if (project) {
    const res = await Engineer.deleteMany({ assignedProjects: project._id });
    console.log(
      `🗑️ Deleted ${res.deletedCount} tasks that belonged to deleted project: ${project._id}`
    );
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
