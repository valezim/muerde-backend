const express = require('express');
const HealthController = require('../controller/HealthController');
// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/ping').get(HealthController.ping);

module.exports = router;
