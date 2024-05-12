/* eslint-disable no-undef */
// db.js
require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://bhuneshvarma63:VYS91t7bWMYHt9HD@inotebook.zqifxiq.mongodb.net/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
