const { Employee } = require('../../models');
const constants = require('../../config/constants');

const getAllEmployees = async (req, res) => {
    try {
        const body = req.body;
        const employees = await Employee.findAndCountAll({
            attributes :[
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
           // order: [["id", "ASC"]],
        });
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employees retrieved successfully',
            data:  employees, 
        },
        constants.STATUS_CODES.SUCCESS
     );
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.BAD_REQUEST).json({
            statusCode: constants.STATUS_CODES.BAD_REQUEST,
            message: 'Internal Server Error',
            err : error,
        },
        constants.STATUS_CODES.BAD_REQUEST
     );
    }
};


const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        const employee = await Employee.findOne({
            where: {
                email: body.email
            }
        });

        if (employee) {
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
            error: error // Include the error message in the response
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
            where : {
                id : body.employee_id,
            }
        });
        if (!employee) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Employee not found',
            },
            constants.STATUS_CODES.NOT_FOUND
            );
        }
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee retrieved successfully',
            data: { employee },
        },
        constants.STATUS_CODES.SUCCESS
        );
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.SERVER_ERROR,
            message: 'Internal Server Error',
            err: error,
        },
        constants.STATUS_CODES.SERVER_ERROR
        );
    }
};

const updateEmployee = async (req, res) => {
    try {
        const body = req.body;
      //  const { firstname, lastname, dob, email, contacts, gender, city } = req.body;
        const employee = await Employee.findOne({
            where : {
                id : body.employee_id,
            }
        });

        if (!employee) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Employee not found'
            });
        }
        await employee.update({ 
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            countrycode: body.countrycode,
            gender: body.gender,
            dob: body.dob,
            contact:body.contact,
            address:body.address,
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
            message: 'Internal Server Error'
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
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
        await employee.destroy({
            where : {
                id : employee.id,
            }
        });
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee deleted successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            err: error
        });
    }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
};
