// app.js
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRouter = require('./routes/superadmin.router');
// const employeeRouter = require('./routes/employee.router');
// const { authenticateToken } = require('./middleware/authentication');
const { sequelize } = require('./models');
const cors = require("cors");


const app = express();

app.use(cors()); // Used CORS for cross-origin and allow-same-origin

app.use(bodyParser.json());

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use('/api/superadmin', authRouter);
// app.use('/api/employee', employeeRouter);

const PORT = process.env.PORT || 8020;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});