const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const SettingController = require('../../controller/SettingController');

router.route('/').put(SettingController.putSetting);

router.route('/').get(SettingController.getSettings);

module.exports = router;
