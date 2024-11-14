const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    id: {type: String, index: true, increment: true, primaryKey: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    finished: {
        type: Boolean, required: false, default: false
    },
})

const Tasks = mongoose.model('Tasks', todoSchema)

module.exports = Tasks;