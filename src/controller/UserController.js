const humps = require('humps');
const UserService = require('../service/UserService');

class UserController {
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
            return res.json({ ...humps.decamelizeKeys(createdUser) });
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
            return res.json({ ...humps.decamelizeKeys(user) });
        } catch (error) {
            console.log(`Error - UserController :: getUserByMail - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get user',
            });
        }
    }
}

module.exports = UserController;