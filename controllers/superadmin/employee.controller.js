const { Employee } = require('../../models');
const constants = require('../../config/constants');

const getAllEmployees = async (req, res) => {
    try {
        const body = req.body;
        const employees = await Employee.findAndCountAll({
            attributes: [
                "id",
                "first_name",
                "last_name",
                "email",
                "gender",
                "dob",
                "phone_no",
                "country_code",
                "address",
            ],
            offset: (parseInt(body.page) - 1) * parseInt(body.limit),
            limit: parseInt(body.limit),
        });
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employees retrieved successfully',
            data: employees,
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.BAD_REQUEST).json({
            statusCode: constants.STATUS_CODES.BAD_REQUEST,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        const existingEmployee = await Employee.findOne({
            where: {
                email: body.email
            }
        });

        if (existingEmployee) {
            return res.status(constants.STATUS_CODES.VALIDATION).json({
                statusCode: constants.STATUS_CODES.VALIDATION,
                message: 'Email already exists'
            });
        }

        const employee_data = await Employee.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            country_code: body.country_code,
            gender: body.gender,
            dob: body.dob,
            phone_no: body.phone_no,
            address: body.address,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee created successfully',
            data: employee_data // Return the created employee data
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

const getEmployee = async (req, res) => {
    try {
        const body = req.body;
        const employee = await Employee.findOne({
            attributes: [
                "id",
                "first_name",
                "last_name",
                "email",
                "gender",
                "dob",
                "phone_no",
                "country_code",
                "address",
            ],
            where: {
                id: body.employee_id,
            }
        });
        if (!employee) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Employee not found',
            });
        }
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee retrieved successfully',
            data: { employee },
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const body = req.body;
        const employee = await Employee.findOne({
            where: {
                id: body.id,
            }
        });

        if (!employee) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Employee not found'
            });
        }

        await employee.update({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            country_code: body.country_code,
            gender: body.gender,
            dob: body.dob,
            phone_no: body.phone_no,
            address: body.address,
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const body = req.body;
        const employee = await Employee.findOne({
            where: {
                id: body.employee_id,
            },
        });
        if (!employee) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Employee not found'
            });
        }
        await employee.destroy();

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// Route to get employees with birthdays matching today's date and month
const findBirthday = ( async (req, res) => {
    try {
        const today = new Date();
        const month = today.getMonth() + 1; // Months are zero-based, so add 1
        const day = today.getDate();
        
        // Query the database to find employees with matching birthday (date and month)
        const employees = await Employee.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: '$dob' }, month] },
                    { $eq: [{ $dayOfMonth: '$dob' }, day] }
                ]
            }
        });

        res.json({ success: true, employees });
    } catch (error) {
        console.error('Error fetching employees with birthdays:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});




module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
};
