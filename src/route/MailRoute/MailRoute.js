const express = require('express');
const router = express.Router();
const MailController = require('../../controller/MailController');

router.route('/').post(MailController.toggleEmail);

module.exports = router;
