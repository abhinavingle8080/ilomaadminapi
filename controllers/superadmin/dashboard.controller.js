const jwt = require("jsonwebtoken");
const { User, Employee, Holiday, Leave } = require("../../models");
const { Op } = require("sequelize");

const dashboard = async (req, res) => {
  const userId = req.user?.user_id;
  try {
    const userCount = await User.count();
    const EmployeeCount = await Employee.count();
    const pendingLeaveCount = await Leave.count({
      where: {
        status: "Pending",
      },
    });


    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const thisMonthHolidayCount = await Holiday.count({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    const isTodayHoliday = await Holiday.count({
        where: {
          date: {
            [Op.eq]: currentDate.toISOString().split("T")[0],
          },
        },
      });

      const todaysBirthday = await Employee.findAndCountAll({
        attributes: ["id", "first_name", "last_name"],
        where: {
          [Op.and]: [
            {
              dob: {
                [Op.substring]: currentDate.toISOString().substr(5, 5), // Extract month and day
              },
            },
            {
              [Op.not]: { dob: "" },
            },
          ],
        },
      });

    res.status(200).json({
      statusCode: 200,
      message: "Dashboard data fetched successfully",
      data: {
        userCount: userCount,
        EmployeeCount: EmployeeCount,
        pendingLeaveCount: pendingLeaveCount,
        thisMonthHolidayCount: thisMonthHolidayCount,
        isTodayHoliday: isTodayHoliday ? true : false,
        todaysBirthday: todaysBirthday,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports = {
  dashboard,
};
