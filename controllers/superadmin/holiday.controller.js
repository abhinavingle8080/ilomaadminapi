// const { get } = require("../../routes/holiday.router");

const { Holiday } = require('../../models');
const constants = require('../../config/constants');

const getAllHolidays = async (req, res) => {
    try {
        const body = req.body;
        const holidays = await Holiday.findAndCountAll({
            attributes: [
                "id",
                "name",
                "date",
                "description"
            ],
            offset: (parseInt(body.page) - 1) * parseInt(body.limit),
            limit: parseInt(body.limit),
        });
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holidays retrieved successfully',
            data: holidays,
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message // Include error message for debugging
        });
    }
};

const createHoliday = async (req, res) => {
    try {
        const body = req.body;
        const holiday = await Holiday.findOne({
            where: {
                name: body.name
            }
        });
        if (holiday) {
            return res.status(constants.STATUS_CODES.VALIDATION).json({
                statusCode: constants.STATUS_CODES.VALIDATION,
                message: 'Holiday with this name already exists'
            });
        }
        const newHoliday = await Holiday.create({
            name: body.name,
            date: body.date,
            description: body.description,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holiday created successfully',
            data: newHoliday
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message // Include error message for debugging
        });
    }
};

const getHoliday = async (req, res) => {
    try {
        const body = req.body;
        const holiday = await Holiday.findOne({
            attributes: [
                "id",
                "name",
                "date",
                "description"
            ],
            where: {
                id: body.id,
            }
        });
        if (!holiday) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Holiday not found',
            });
        }
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holiday retrieved successfully',
            data: holiday,
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message // Include error message for debugging
        });
    }
};

const updateHoliday = async (req, res) => {
    try {
        const body = req.body;
        const holiday = await Holiday.findOne({
            where: {
                id: body.id,
            }
        });
        if (!holiday) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Holiday not found'
            });
        }
        await holiday.update({
            name: body.name,
            date: body.date,
            description: body.description,
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holiday updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message // Include error message for debugging
        });
    }
};

const deleteHoliday = async (req, res) => {
    try {
        const body = req.body;
        const holiday = await Holiday.findOne({
            where: {
                id: body.id,
            },
        });
        if (!holiday) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Holiday not found'
            });
        }
        await holiday.destroy();

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holiday deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message // Include error message for debugging
        });
    }
};

module.exports = {
    getAllHolidays,
    createHoliday,
    getHoliday,
    updateHoliday,
    deleteHoliday
};
