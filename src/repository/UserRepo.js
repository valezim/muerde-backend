const BaseRepo = require('./BaseRepo');

class UserRepo extends BaseRepo {
    constructor() {
        super();
    }

    async getUsers() {
        try {
            const users = await this.db.user.findMany({
                select: {
                    idUser: true,
                    name: true,
                    mail: true,
                    address: true,
                    phone: true,
                    creationDate: true,
                    role: true,
                }
            });
            return users;
        } catch (error) {
            console.log(`Error - UserRepo :: getUsers - ${error.stack}`);
            throw error;
        }
    }

    async save(user) {
        try {
            const newUser = await this.db.user.create({
                data: {
                    name: user.name,
                    mail: user.mail,
                    password: user.password,
                    creationDate: new Date(),
                    role: "USER",
                    address: user.address,
                },
                select: {
                    idUser: true,
                    name: true,
                    mail: true,
                    creationDate: true,
                    role: true,
                    address: true,
                }
            });
            return newUser;
        } catch (error) {
            console.log(`Error - UserRepo :: save - ${error.stack}`);
            throw error;
        }
    }

    async getUserByMail(mail) {
        try {
            const user = await this.db.user.findUnique({
                where: {
                    mail: mail,
                },
                select: {
                    idUser: true,
                    name: true,
                    mail: true,
                    password: true,
                    creationDate: true,
                    role: true,
                    address: true,
                }
            });
            return user;
        } catch (error) {
            console.log(`Error - UserRepo :: getUserByMail - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = new UserRepo();