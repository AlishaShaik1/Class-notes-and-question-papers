// backend/src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Import the DB function
import noteRoutes from './routes/noteRoutes.js'; // Import routes

dotenv.config();
connectDB(); // Execute the database connection

const app = express();

// Middleware
app.use(cors()); // Enable cross-origin requests from your frontend
app.use(express.json()); // Body parser for JSON data

// Routes
app.use('/api/notes', noteRoutes);

// Simple route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});