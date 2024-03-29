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
                },
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
                    address: user.address,
                    phone: user.phone,
                    creationDate: new Date(),
                    role: user.role,
                },
                select: {
                    idUser: true,
                    name: true,
                    mail: true,
                    address: true,
                    phone: true,
                    creationDate: true,
                    role: true,
                },
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
                    address: true,
                    phone: true,
                    creationDate: true,
                    role: true,
                },
            });
            return user;
        } catch (error) {
            console.log(`Error - UserRepo :: getUserByMail - ${error.stack}`);
            throw error;
        }
    }

    async getById(id) {
        try {
            const user = await this.db.User.findUnique({
                where: {
                    idUser: id,
                },
            });
            return user;
        } catch (error) {
            console.log(`Error - UserRepo :: getById - ${error.stack}`);
            throw error;
        }
    }

    async update(id, user) {
        try {
            const updatedUser = await this.db.user.update({
                where: {
                    idUser: parseInt(id),
                },
                data: {
                    mail: user.mail,
                    address: user.address,
                    phone: user.phone,
                },
                select: {
                    idUser: true,
                    name: true,
                    mail: true,
                    address: true,
                    phone: true,
                    creationDate: true,
                    role: true,
                },
            });
            return updatedUser;
        } catch (error) {
            console.log(`Error - UserRepo :: update - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = new UserRepo();
