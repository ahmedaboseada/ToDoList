const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Import mongoose-sequence

const usersSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^(010|011|012|015)\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid Egyptian phone number!`
        }
    },
    gender: {type: String, required: true},
});

// Apply the auto-increment plugin to the 'id' field
usersSchema.plugin(AutoIncrement, {inc_field: 'id', start_seq: 0});

usersSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Ensure virtuals are included when converting to JSON
usersSchema.set('toJSON', {virtuals: true});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
