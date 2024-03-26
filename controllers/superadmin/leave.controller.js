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
                "reason",
                "status" // Include status in attributes
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
        const newLeave = await Leave.create({
            date: body.date,
            day: body.day,
            duration: body.duration,
            reason: body.reason,
            status: body.status, // Set status to 'pending' by default
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
                "reason",
                "status" // Include status in attributes
            ],
            where: {
                id: body.leave_id,
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
        // Update leave fields
        leave.date = body.date;
        leave.day = body.day;
        leave.duration = body.duration;
        leave.reason = body.reason;
        leave.status = body.status || leave.status; // Update status if provided, otherwise keep existing status
        leave.updated_at = new Date();
        await leave.save();

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
                id: body.leave_id,
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
