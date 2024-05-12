/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();

// Enable CORS for all origins during development
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from your frontend deployed on localhost
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.options('*', cors(corsOptions)); // Enable preflight requests for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Root route
app.get('/', (req, res) => {
    res.send("iNotebook is running");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
