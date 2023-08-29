const humps = require('humps');
const MailService = require('../service/MailService');

class MailController {
    static async toggleEmail(req, res) {
        MailService.toggleEmailStatus();
        const now = new Date();
        const currentTime = now.toISOString();

        return res.json({
            message: `El envío de correo está ${MailService.isEmailEnabled ? 'habilitado' : 'deshabilitado'}`,
            lastModified: currentTime
        });
    }

    static async sendPurchaseConfirmation(req, res) {
        try {
            const { email } = req.body;
            const mail = await MailService.sendPurchaseConfirmation(email);
            return res.json(humps.decamelizeKeys(mail));
        } catch (error) {
            console.log(`Error - MailController :: sendPurchaseConfirmation - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to send purchase confirmation',
            });
        }
    }

    static async sendReviewRequest(req, res) {
        try {
            const { email } = req.body;
            const mail = await MailService.sendReviewRequest(email);
            return res.json(humps.decamelizeKeys(mail));
        } catch (error) {
            console.log(`Error - MailController :: sendReviewRequest - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to send review request',
            });
        }
    }
}

module.exports = MailController;