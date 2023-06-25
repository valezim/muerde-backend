const humps = require('humps');
const UserService = require('../service/UserService');

class UserController {
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
}

module.exports = UserController;