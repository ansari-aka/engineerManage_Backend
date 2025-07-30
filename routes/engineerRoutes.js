const express = require("express");
const router = express.Router();
const Engineer = require("../models/Engineer");

// Create a new engineer
router.post("/", async (req, res) => {
  const { name, role, skills, capacity, email, phone } = req.body;

  try {
    const engineer = new Engineer(req.body);
    await engineer.save();
    res.status(201).json(engineer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all engineers
router.get("/", async (req, res) => {
  try {
    const engineers = await Engineer.find().populate("assignedProjects");
    res.json(engineers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get engineer by ID
router.get("/:id", async (req, res) => {
  try {
    const engineer = await Engineer.findById(req.params.id).populate(
      "assignedProjects"
    );
    if (!engineer)
      return res.status(404).json({ message: "Engineer not found" });
    res.json(engineer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update engineer
router.put("/:id", async (req, res) => {
  try {
    const updatedEngineer = await Engineer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEngineer)
      return res.status(404).json({ message: "Engineer not found" });
    res.json(updatedEngineer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete engineer
router.delete("/:id", async (req, res) => {
  try {
    const engineer = await Engineer.findByIdAndDelete(req.params.id);
    if (!engineer)
      return res.status(404).json({ message: "Engineer not found" });
    res.json({ message: "Engineer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
