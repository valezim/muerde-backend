const {PrismaClient} = require('@prisma/client');

class BaseRepo {
  constructor() {
    this.db = new PrismaClient();
  }
}

module.exports = BaseRepo;
