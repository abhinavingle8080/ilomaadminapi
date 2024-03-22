// // getUsersBirthday.js

// const { User } = require('../../models'); 
// const Sequelize = require('sequelize');

// const getUsersBirthday = async () => {
//     try {
//         const today = new Date();
//         const users = await User.findAll({
//             where: {
//                 // Assuming `dob` is the field representing the user's date of birth
//                 dob: {
//                     [Sequelize.fn('MONTH', Sequelize.col('dob'))]: today.getMonth() + 1,
//                     [Sequelize.fn('DAY', Sequelize.col('dob'))]: today.getDate()
//                 }
//             }
//         });
//         return users;
//     } catch (error) {
//         console.error("Error fetching users' birthdays:", error);
//         return [];
//     }
// };

// module.exports = getUsersBirthday;