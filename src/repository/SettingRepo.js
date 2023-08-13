const BaseRepo = require('./BaseRepo');

class IngredientRepo extends BaseRepo {
  constructor() {
    super();
  }

  async updateOrCreate(setting = {}) {
    try {
      const updatedSetting = await this.db.Setting.upsert({
        where: { key: setting.key },
        update: {
          value: setting.value || undefined,
          last_modified: setting.lastModified || undefined,
        },
        create: {
          key: setting.key,
          value: setting.value,
          last_modified: setting.lastModified
        },
      });
      return updatedSetting;
    } catch (error) {
      console.log(`Error - SettingRepo :: updateOrCreate - ${error.stack}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const settings = await this.db.Setting.findMany();
      return settings;
    } catch (error) {
      console.log(`Error - SettingRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new IngredientRepo();
