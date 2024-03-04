const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const dashboard = async (req, res) => {
    
    const userId = req.user?.user_id; 
    try {
        const user = await User.count();
        
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found',
                data: {},
                success: false
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: 'Dashboard data fetched successfully',
            data: { user },
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
            data: {},
            success: false
        });
    }
};

module.exports = {
    dashboard
};