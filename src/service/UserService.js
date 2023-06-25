const UserRepo = require('../repository/UserRepo');
const bcrypt = require('bcrypt');

class UserService {
    static async postUser(user) {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        try {
            const newUser = await UserRepo.save(user);
            return newUser;
        } catch (error) {
            console.log(`Error - UserService :: postUser - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = UserService;