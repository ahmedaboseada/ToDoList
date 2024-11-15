const mongoose = require('mongoose');
const events = require('../events');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('../controllers/validateUserInputs');

const createUser = async (req, res) => {
    try {
        const {firstname, lastname, username, email, password, confirm_password, phone, gender} = req.body;
        const validatedInputs = validator({
            firstname, lastname, username, email, password, confirm_password, phone, gender
        });

        // Check if there are validation errors
        if (validatedInputs.hasErrors) {
            // Send the validation errors back as a response
            return res.status(400).json(validatedInputs);
        }

        hashedPassword = await bcrypt.hash(validatedInputs.password, 10);

        const newUser = new User({
            firstName: validatedInputs.firstname,
            lastName: validatedInputs.lastname,  // Fixed here: used 'lastName' instead of 'lastLame'
            username: validatedInputs.username,
            email: validatedInputs.email,
            password: hashedPassword,
            phone: validatedInputs.phone,
            gender: validatedInputs.gender,
        });

        await newUser.save();

        // Emit the "createUser" event with the new user and pass a callback to handle the success message
        events.emit('createUser', newUser, (message) => {
            // Send the success message as a JSON response
            res.status(201).redirect('/');
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Failed to create user'});
    }
}

module.exports = {createUser}