const express = require('express');
const cors = require('cors');
const responseWrapper = require('./middleware/responseWrapper');
require('dotenv').config();

// Import routes
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(responseWrapper);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/task', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
