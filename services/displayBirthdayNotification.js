// // displayBirthdayNotification.js
// const getUsersBirthday = require('./getUsersBirthday');

// const displayBirthdayNotification = async () => {
//     try {
//         const users = await getUsersBirthday();
//         if (users.length > 0) {
//             console.log("Today's Birthdays:");
//             users.forEach(user => {
//                 console.log(`${user.first_name} ${user.last_name} is celebrating their birthday today!`);
//             });
//         } else {
//             console.log("No birthdays today.");
//         }
//     } catch (error) {
//         console.error("Error displaying birthday notification:", error);
//     }
// };

// module.exports = displayBirthdayNotification;
