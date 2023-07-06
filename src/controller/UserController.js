const humps = require('humps');
const UserService = require('../service/UserService');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    static async postUser(req, res) {
        try {
            const newUser = humps.camelizeKeys(req.body.user);
            const createdUser = await UserService.postUser(newUser);
            const token = jwt.sign({ id: createdUser.idUser }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ ...humps.decamelizeKeys(createdUser), token: token });
        } catch (error) {
            console.log(`Error - UserController :: postUser - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to create user',
            });
        }
    }  
    
    static async getUserByMail(req, res) {
        try {
            const { mail, password } = req.body; 
            const user = await UserService.getUserByMail(mail, password);
            const token = jwt.sign({ id: user.idUser }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ ...humps.decamelizeKeys(user), token: token });
        } catch (error) {
            console.log(`Error - UserController :: getUserByMail - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get user',
            });
        }
    }
}

module.exports = UserController;