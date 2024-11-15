// utils/eventManager.js
const EventEmitter = require('events');
const eventManager = new EventEmitter();

console.log('EventManager initialized'); // Debug: Ensure this is logged once.

module.exports = eventManager;
