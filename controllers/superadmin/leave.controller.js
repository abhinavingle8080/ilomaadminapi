const { Leave } = require('../../models'); 
const constants = require('../../config/constants');

const getAllLeaves = async (req, res) => {
    try {
        const body = req.body;
        const leaves = await Leave.findAndCountAll({
            attributes: [
                "id",
                "date",
                "day",
                "duration",
                "reason"
            ],
            offset: (parseInt(body.page) - 1) * parseInt(body.limit),
            limit: parseInt(body.limit),
        });
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Leaves retrieved successfully',
            data: leaves,
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

const createLeave = async (req, res) => {
    try {
        const body = req.body;
        // Check if leave already exists for the same date, day, duration, and reason
        const leave = await Leave.findOne({
            where: {
                date: body.date,
                day: body.day,
                duration: body.duration,
                reason: body.reason
            }
        });
        if (leave) {
            return res.status(constants.STATUS_CODES.VALIDATION).json({
                statusCode: constants.STATUS_CODES.VALIDATION,
                message: 'Leave with this date, day, duration, and reason already exists'
            });
        }
        //  new leave bnvalii
        const newLeave = await Leave.create({
            date: body.date,
            day: body.day,
            duration: body.duration,
            reason: body.reason,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Leave created successfully',
            data: newLeave
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

const getLeave = async (req, res) => {
    try {
        const body = req.body;
        const leave = await Leave.findOne({
            attributes: [
                "id",
                "date",
                "day",
                "duration",
                "reason"
            ],
            where: {
                id: body.id,
            }
        });
        if (!leave) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Leave not found',
            });
        }
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Leave retrieved successfully',
            data: leave,
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

const updateLeave = async (req, res) => {
    try {
        const body = req.body;
        const leave = await Leave.findOne({
            where: {
                id: body.id,
            }
        });
        if (!leave) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Leave not found'
            });
        }
        await leave.update({
            date: body.date,
            day: body.day,
            duration: body.duration,
            reason: body.reason,
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Leave updated successfully'
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

const deleteLeave = async (req, res) => {
    try {
        const body = req.body;
        const leave = await Leave.findOne({
            where: {
                id: body.id,
            },
        });
        if (!leave) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Leave not found'
            });
        }
        await leave.destroy();

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Leave deleted successfully'
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

module.exports = {
    getAllLeaves,
    createLeave,
    getLeave,
    updateLeave,
    deleteLeave
};
