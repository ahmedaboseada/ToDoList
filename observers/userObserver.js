// observers/userObserver.js
const {sendEmail} = require('../controllers/emailer');
const userService = require('../services/userService');

// observers/userObserver.js
class UserObserver {
    static async onUserCreated(user) {
        console.log('userCreated event received with data:', user); // Debug log
        if (user && user.email && user.firstname) {
            await sendEmail(user.email, user);
        } else {
            console.error('Invalid user object received:', user);
        }
    }

    static logUserCreation(user) {
        console.log('logUserCreation triggered:', user.username);
    }

    static onUserLogin(user) {
        console.log('userLogin triggered:', user);
    }

    static async userAuthenticated(user) {
        console.log('userAuthenticated event received with data:', user);
    }
}


module.exports = UserObserver;
