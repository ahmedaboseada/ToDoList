const validator = require('validator');

const validateUserInput = (userData) => {
    const {firstname, lastname, username, email, password, confirm_password, phone, gender} = userData;

    const validationResult = {
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        password: null,
        confirm_password: null,
        phone: null,
        gender: null,
        hasErrors: false
    };

    // Validate First Name and Last Name (only letters, no spaces)
    if (!/^[a-zA-Z\s]+$/.test(firstname)) {
        validationResult.firstname = "First Name must only contain letters and spaces";
        validationResult.hasErrors = true;
    } else {
        validationResult.firstname = firstname;
    }

    if (!/^[a-zA-Z\s]+$/.test(lastname)) {
        validationResult.lastname = "Last Name must only contain letters and spaces";
        validationResult.hasErrors = true;
    } else {
        validationResult.lastname = lastname;
    }

    // Validate Username (only letters and digits, no spaces)
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        validationResult.username = "Username must only contain letters and digits, without spaces";
        validationResult.hasErrors = true;
    } else {
        validationResult.username = username;
    }

    // Validate Email using validator.isEmail
    if (!validator.isEmail(email)) {
        validationResult.email = "Invalid email address";
        validationResult.hasErrors = true;
    } else {
        validationResult.email = email;
    }

    // Validate Password (at least 8 characters)
    if (password.length < 8) {
        validationResult.password = "Password must be at least 8 characters";
        validationResult.hasErrors = true;
    } else {
        validationResult.password = password;
    }

    // Confirm Password Validation (must match the password)
    if (password !== confirm_password) {
        validationResult.confirm_password = "Password and Confirm Password do not match";
        validationResult.hasErrors = true;
    } else {
        validationResult.confirm_password = confirm_password;
    }

    // Validate Phone Number using provided regex (for numbers starting with 010, 011, 012, or 015)
    const phonePattern = /^(010|011|012|015)\d{8}$/;
    if (!phonePattern.test(phone)) {
        validationResult.phone = "Invalid phone number. It must start with 010, 011, 012, or 015 and be followed by 8 digits.";
        validationResult.hasErrors = true;
    } else {
        validationResult.phone = phone;
    }

    // Validate Gender (either Male or Female)
    if (!["Male", "Female"].includes(gender)) {
        validationResult.gender = "Gender must be 'Male' or 'Female'";
        validationResult.hasErrors = true;
    } else {
        validationResult.gender = gender;
    }

    return validationResult;
};

module.exports = validateUserInput;
