const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// MongoDB connection
require("dotenv").config();

const mongoUrl = process.env.MONGODB;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import routes
const engineerRoutes = require("./routes/engineerRoutes");
const projectRoutes = require("./routes/projectRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const userRoutes = require("./routes/userRoutes");
const protect = require("./middleware/auth");

// Use routes
app.use("/api/engineers", protect, engineerRoutes);
app.use("/api/projects", protect, projectRoutes);
app.use("/api/assignments", protect, assignmentRoutes);
app.use("/api/users", userRoutes);

// Start server
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
