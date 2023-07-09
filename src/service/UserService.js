const UserRepo = require('../repository/UserRepo');
const bcrypt = require('bcrypt');

class UserService {
    static async getUsers() {
        try {
            const users = await UserRepo.getUsers();
            return users;
        } catch (error) {
            console.log(`Error - UserService :: getUsers - ${error.stack}`);
            throw error;
        }
    }

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

    static async getUserByMail(mail, password) {
        try {
            const user = await UserRepo.getUserByMail(mail);
            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    const { password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                } else {
                    throw { status: 401, message: 'Invalid password' };
                }
            } else {
                throw { status: 404, message: 'User not found' };
            }
        } catch (error) {
            console.log(`Error - UserService :: getUserByMail - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = UserService;