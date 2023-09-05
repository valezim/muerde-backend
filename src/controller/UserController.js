const humps = require('humps');
const UserService = require('../service/UserService');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    static getTokenTrue(req, res) {
        try {
            return res.json(humps.decamelizeKeys(req.usuario));
        } catch (error) {
            console.log(`Error - UserController :: getTokenTrue - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to getTokenTrue',
            });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            return res.json(humps.decamelizeKeys(users));
        } catch (error) {
            console.log(`Error - UserController :: getUsers - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get users',
            });
        }
    }
    
    static async postUser(req, res) {
        try {
            const newUser = humps.camelizeKeys(req.body.user);
            const createdUser = await UserService.postUser(newUser);
            const token = jwt.sign({ id: createdUser.idUser }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ ...humps.decamelizeKeys(createdUser), token: token });
        } catch (error) {
            console.log(`Error - UserController :: postUser - `, error);
            return res.status(error.status || 500).json({
                error: error,
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
            console.log(`Error - UserController :: getUserByMail - `, error);
            return res.status(error.status || 500).json({
                error: error,
            });
        }
    }

    static async putUser(req, res) {
        try {
            const id = req.query.id;
            const user = humps.camelizeKeys(req.body.user);
            const updatedUser = await UserService.putUser(id, user);
            return res.json(humps.decamelizeKeys(updatedUser));
        } catch (error) {
            console.log(`Error - UserController :: putUser - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to update user',
            });
        }
    }
}

module.exports = UserController;