require('dotenv').config()
const express = require("express");
const app = express();
const jobRouter = require("./routes/jobRouter");
const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
// Explanation:
// CORS = Cross-Origin Resource Sharing
// CORS is a security feature that restricts how resources on a web page can be requested from another domain
// Include this if your application has a separate frontend and backend to allow the frontend to communicate with the backend
app.use(cors())
app.use(express.json());

connectDB();

// Use the jobRouter for all "/jobs" routes
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})  
