const humps = require('humps');
const SettingService = require('../service/SettingService');

class SettingController {

  static async putSetting(req, res) {
    try {
      const key = req.query.key;
      const setting = humps.camelizeKeys(req.body);
      const updatedSetting = await SettingService.putSetting({ ...setting, key });

      return res.json({ ...humps.decamelizeKeys(updatedSetting) });
    } catch (error) {
      console.log(`Error - SettingController :: putSetting - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to update Setting',
        stack: error.stack,
      });
    }
  }

  static async getSettings(req, res) {
    try {
      const settings = await SettingService.getAllSettings();
      return res.json({ settings: humps.decamelizeKeys(settings) });
    } catch (error) {
      console.log(`Error - SettingController :: getSettings - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get settings',
        stack: error.stack,
      });
    }
  }
}

module.exports = SettingController;
