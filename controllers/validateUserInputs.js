const validator2 = require('validator');

const validateUserInput = (userData) => {
    const { firstname, lastname, username, email, password, phone, gender } = userData;

    const validationResult = {};

    // Validate First Name and Last Name (only letters, no spaces)
    validationResult.firstname = /^[a-zA-Z]+$/.test(firstname) ? null : "First Name must only contain letters";
    validationResult.lastname = /^[a-zA-Z]+$/.test(lastname) ? null : "Last Name must only contain letters";

    // Validate Email using validator.isEmail
    validationResult.email = validator.isEmail(email) ? null : "Invalid email address";

    // Validate Password (at least 8 characters)
    validationResult.password = password.length >= 8 ? null : "Password must be at least 8 characters";

    // Validate Phone Number using provided regex (for numbers starting with 010, 011, 012, or 015)
    const phonePattern = /^(010|011|012|015)\d{8}$/;
    validationResult.phone = phonePattern.test(phone) ? null : "Invalid phone number. It must start with 010, 011, 012, or 015 and be followed by 8 digits.";

    // Validate Gender (either Male or Female)
    validationResult.gender = ["Male", "Female"].includes(gender) ? null : "Gender must be 'Male' or 'Female'";

    // Check if any of the validation results are not null (which means an error exists)
    validationResult.hasErrors = Object.values(validationResult).some(value => value !== null);

    return validationResult;
};

module.exports = validateUserInput;
