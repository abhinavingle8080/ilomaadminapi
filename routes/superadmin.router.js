// routes/auth.router.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AuthController = require('../controllers/superadmin/auth.controller');
const passport = require('passport');
const superadminMiddleware = require('../middleware/superadmin.middleware');
const holidayController = require('../controllers/superadmin/holiday.controller');
const EmployeeController = require('../controllers/superadmin/employee.controller');
const leaveController = require('../controllers/superadmin/leave.controller');
const dashboardController = require('../controllers/superadmin/dashboard.controller');



router.get('/protected', superadminMiddleware.authenticateToken, (req, res) => {
    // Protected route logic
    res.json({ message: 'Protected route accessed successfully' });
    // Route logic for authenticated users
});

router.post('/login', AuthController.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), AuthController.getProfileDetails);
router.post('/dashboard', passport.authenticate('jwt', { session: false }), dashboardController.dashboard);

router.post('/get-employees', passport.authenticate('jwt', { session: false }), EmployeeController.getAllEmployees);
router.post('/create-employee', passport.authenticate('jwt', { session: false }), EmployeeController.createEmployee);
router.post('/get-employee', passport.authenticate('jwt', { session: false }), EmployeeController.getEmployee);
router.post('/update-employee', passport.authenticate('jwt', { session: false }), EmployeeController.updateEmployee);
router.post('/delete-employee', passport.authenticate('jwt', { session: false }), EmployeeController.deleteEmployee);

router.post('/get-all-holidays', passport.authenticate('jwt', { session: false }), holidayController.getAllHolidays);
router.post('/create-holiday', passport.authenticate('jwt', { session: false }), holidayController.createHoliday);
router.post('/get-holiday', passport.authenticate('jwt', { session: false }), holidayController.getHoliday);
router.post('/update-holiday', passport.authenticate('jwt', { session: false }), holidayController.updateHoliday);
router.post('/delete-holiday', passport.authenticate('jwt', { session: false }), holidayController.deleteHoliday);

router.post('/get-all-leaves', leaveController.getAllLeaves);
router.post('/get-leave', leaveController.getLeave);
router.post('/create-leave', leaveController.createLeave);
router.post('/update-leave', leaveController.updateLeave);
router.post('/delete-leave', leaveController.deleteLeave);

module.exports = router;