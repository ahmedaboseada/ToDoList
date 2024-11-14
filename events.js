const eventEmitter = require('events')
const events = new eventEmitter()
const {sendEmail, sendTestEmail} = require('./controllers/emailer')
// Listen for the "createUser" event and trigger any necessary actions (like sending notifications)
events.on('createUser', (user, callback) => {
    // You can perform additional actions here, e.g., send an email or log the action
    const message = `User ${user.username} has been created successfully`;
    sendEmail(`${user.email}`, user)
    // Trigger the callback with the success message
    callback(message);
});

module.exports = events;