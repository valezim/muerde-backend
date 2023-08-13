const SettingRepo = require('../repository/SettingRepo');

class SettingService {

  async putSetting({ key, value }) {
    try {
      const updatedSetting = await SettingRepo.updateOrCreate({
        key,
        value,
        lastModified: new Date(),
      });
      return updatedSetting;
    } catch (error) {
      console.log(`Error - SettingService :: putSetting - ${error.stack}`);
      throw error;
    }
  }

  async getAllSettings() {
    try {
      return await SettingRepo.getAll();
    } catch (error) {
      console.log(`Error - SettingService :: getAllSettings - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new SettingService();
