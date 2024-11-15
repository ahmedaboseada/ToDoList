// events/index.js
const eventManager = require('../utils/eventManager');
const UserObserver = require('../observers/userObserver');

// Register observers to the "userCreated" event
eventManager.on('userCreated', UserObserver.onUserCreated);
eventManager.on('userCreated', UserObserver.logUserCreation);
eventManager.on('onUserLogin', UserObserver.onUserLogin);
eventManager.on('userAuthenticated', UserObserver.userAuthenticated);

//listen on events
module.exports = eventManager;
