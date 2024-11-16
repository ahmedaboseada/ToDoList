// utils/validateUserInput.js
const validator = require('validator');
const ValidationError = require('./ValidationError');

const validateUserInput = (userData) => {
    const {firstname, lastname, username, email, password, confirm_password, phone, gender} = userData;

    const errors = {};

    if (!/^[a-zA-Z\s]+$/.test(firstname)) {
        errors.firstname = "First Name must only contain letters and spaces";
    }

    if (!/^[a-zA-Z\s]+$/.test(lastname)) {
        errors.lastname = "Last Name must only contain letters and spaces";
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errors.username = "Username must only contain letters and digits, without spaces";
    }

    if (!validator.isEmail(email)) {
        errors.email = "Invalid email address";
    }

    if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    if (password !== confirm_password) {
        errors.confirm_password = "Password and Confirm Password do not match";
    }

    const phonePattern = /^(010|011|012|015)\d{8}$/;
    if (!phonePattern.test(phone)) {
        errors.phone = "Invalid phone number. It must start with 010, 011, 012, or 015 and be followed by 8 digits.";
    }

    if (!["Male", "Female"].includes(gender)) {
        errors.gender = "Gender must be 'Male' or 'Female'";
    }

    if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors); // Throw custom error with detailed feedback
    }

    return userData; // Return valid data for further processing
};

module.exports = validateUserInput;
