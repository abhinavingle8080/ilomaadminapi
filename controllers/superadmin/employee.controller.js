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

    //const { firstName, lastName, dob, email,gender, contact, countrycode, address } = req.body;
    try {
        const body = req.body;
        const employee = await Employee.findOne({
            where: {
                email: body.email
            }
        });
        console.log("employee",body.email);
        if(employee) {
            res.status(constants.STATUS_CODES.VALIDATION).json({
                statusCode: constants.STATUS_CODES.VALIDATION,
                message: 'Email already exist'
        },
        constants.STATUS_CODES.VALIDATION
      );
    
     const employee = await Employee.create({ 
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      countrycode: body.countrycode,
      gender: body.gender,
      dob: body.dob,
      contact:body.contact,
      address:body.address,
      created_at: new Date(),
      updated_at: new Date(),
     });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee created successfully'
        }
        //constants.STATUS_CODES.SUCCESS
        );
    }
}catch(error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            err : error
        }
       // constants.STATUS_CODES.INTERNAL_SERVER_ERROR
        );
    }
};

const getEmployee = async (req, res) => {
    try {
        const body = req.body;
        const employee = await Employee.findOne({ 
            attributes: [
                "id",
                "firstName",
                "lastName",
                "email",
                "gender",
                "dob",
                "contact",
                "countrycode",
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
        console.error(error);
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
/**const { Employee } = require('../../models');
const constants = require('../../config/constants');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAndCountAll();
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employees retrieved successfully',
            data: { employees }
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
        });
    }
};

const createEmployee = async (req, res) => {
    const { firstname, lastname, dob, email, contacts, gender, city } = req.body;
    try {
        const employee = await Employee.create({ firstname, lastname, dob, email, contacts, gender, city });
        res.status(constants.STATUS_CODES.CREATED).json({
            statusCode: constants.STATUS_CODES.CREATED,
            message: 'Employee created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
        });
    }
};

const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ where: { id } });
        if (!employee) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Employee not found'
            });
        }
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee retrieved successfully',
            data: { employee }
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, dob, email, contacts, gender, city } = req.body;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Employee not found'
            });
        }
        await employee.update({ firstname, lastname, dob, email, contacts, gender, city });
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Employee updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
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
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
};**/

