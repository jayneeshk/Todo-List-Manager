const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const todosRoutes = require('./routes/todos');
const summarizeRoutes = require('./routes/summarize');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/todos', todosRoutes);
app.use('/summarize', summarizeRoutes);

// Catch-all route for undefined endpoints
app.use((req, res) => {
  console.error(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});