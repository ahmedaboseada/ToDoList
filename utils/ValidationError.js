// utils/ValidationError.js
class ValidationError extends Error {
    constructor(errors) {
        super('Validation Error');
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.errors = errors; // Store detailed validation errors
    }
}

module.exports = ValidationError;
