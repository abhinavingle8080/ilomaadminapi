// app.js
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const superAdminRouter = require('./routes/superadmin.router');
// const employeeRouter = require('./routes/employee.router');
const { authenticateToken } = require('./middleware/authentication');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(cors());

// Initialize Passport
app.use(passport.initialize());
// app.use(authenticateToken);

// Routes
app.use('/api/superadmin', superAdminRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
