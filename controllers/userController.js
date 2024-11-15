// controllers/userController.js
const UserService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).redirect('/');
    } catch (error) {
        console.error(error.message);
        if (error.message.includes('already exists')) {
            return res.status(400).json({error: error.message});
        }
        res.status(500).json({error: 'Failed to create user'});
    }
};

const loginUser = async (req, res) => {
    try {
        const userInputs = req.body;
        const userData = await UserService.getUserByEmailOrUser(userInputs.identifier)
        const authFlag = await UserService.authenticateUser(userData, userInputs);
        if (!authFlag) {
            return res.status(401).json({error: 'Invalid credentials'});
        }
        req.session.userID = userData.firstName;
        res.status(200).redirect('/');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {createUser, loginUser};
