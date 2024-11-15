// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('../controllers/validateUserInputs');
const eventManager = require('../events/index');
const mongoose = require("mongoose");

class UserService {
    static async createUser(userData) {
        try {
            const validatedInputs = validator(userData);

            if (validatedInputs.hasErrors) {
                throw new Error(JSON.stringify(validatedInputs));
            }

            const hashedPassword = await bcrypt.hash(validatedInputs.password, 10);

            const newUser = new User({
                firstName: validatedInputs.firstname,
                lastName: validatedInputs.lastname,
                username: validatedInputs.username,
                email: validatedInputs.email,
                password: hashedPassword,
                phone: validatedInputs.phone,
                gender: validatedInputs.gender,
            });

            await newUser.save();
            // services/userService.js
            console.log('Emitting userCreated event with data:', userData); // Debug log
            eventManager.emit('userCreated', userData);
            return newUser;
        } catch (err) {
            if (err.code === 11000) {
                // Handle duplicate key error
                throw new Error(`A user with the phone number "${err.keyValue.phone}" already exists.`);
            }
            throw err; // Re-throw other errors
        }


    }

    static async getUserByEmailOrUser(identifier) {
        const userData = await User.findOne({
            $or: [{username: identifier}, {email: identifier}],
        })
        console.log(userData)
        if (!userData) {
            console.log("Username or Email not found");
            return null;
        }
        eventManager.emit('onUserLogin', userData);
        return userData
    }

    static async authenticateUser(userData, userInputs) {
        if (userData) {
            const checkedPassword = await bcrypt.compare(userInputs.password, userData.password);
            if (checkedPassword) {
                eventManager.emit('userAuthenticated', userData);
                return true
            }
        }
        return false
    }
}

module.exports = UserService;
