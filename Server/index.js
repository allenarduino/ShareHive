const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
