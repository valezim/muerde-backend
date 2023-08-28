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

    static async getById(id) {
        try {
            const idNumber = Number(id);
            const user = await UserRepo.getById(idNumber);
            return user;
        } catch (error) {
            console.log(`Error - UserService :: getById - ${error.stack}`);
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
            console.log(`Error - UserService :: postUser - `, error);        
            if (error.code === 'P2002' && error.meta && error.meta.target) {
                if (error.meta.target.includes('User_mail_key')) {
                    throw { status: 409, error: 'Ya existe un cliente con este correo electrónico' };
                } else if (error.meta.target.includes('User_phone_key')) {
                    throw { status: 400, error: 'Ya existe un cliente con este número de teléfono' };
                }
            }                
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
                    throw { status: 401, error: 'Invalid password' };
                }
            } else {
                throw { status: 404, error: 'User not found' };
            }
        } catch (error) {
            console.log(`Error - UserService :: getUserByMail`, error);
            throw error;
        }
    }

    static async putUser(id, user) {
        try {
            const updatedUser = await UserRepo.update(id, user);
            return updatedUser;
        } catch (error) {
            console.log(`Error - UserService :: putUser - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = UserService;
