const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const purchaseConfirmationHTML = fs.readFileSync('src/email_templates/purchaseConfirmation.html', 'utf-8');
const reviewRequestHTML = fs.readFileSync('src/email_templates/reviewRequest.html', 'utf-8');
const SettingRepo = require('../repository/SettingRepo');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'muerde.reposteria@outlook.com',
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false,
            },
        });
    }

    async isMailEnabled() {
        const setting = await SettingRepo.getSetting('mail_enabled');
        return setting?.value === 'true';
    }

    async sendPurchaseConfirmation(email) {
        if (await this.isMailEnabled()) {
            try {
                const mailOptions = {
                    from: 'Muerde Repostería <muerde.reposteria@outlook.com>',
                    to: email,
                    subject: 'Confirmación de compra',
                    text: 'Gracias por tu compra',
                    html: purchaseConfirmationHTML,
                };
                const result = await this.transporter.sendMail(mailOptions);
                return { success: true, result };
            } catch (error) {
                console.log('Error enviando correo de confirmación de compra:', error);
                return { success: false, error };
            }
        } else {
            console.log('Envío de correo está desactivado.');
            return { success: false, message: 'Email sending is disabled' };
        }
    }

    async sendReviewRequest(email) {
        if (await this.isMailEnabled()) {
            try {
                const mailOptions = {
                    from: 'Muerde Repostería <muerde.reposteria@outlook.com>',
                    to: email,
                    subject: 'Solicitud de reseña',
                    text: 'Por favor, deja una reseña para tu reciente compra',
                    html: reviewRequestHTML,
                };

                const result = await this.transporter.sendMail(mailOptions);
                return { success: true, result };
            } catch (error) {
                console.log('Error enviando correo de solicitud de reseña:', error);
                return { success: false, error };
            }
        } else {
            console.log('Envío de correo está desactivado.');
            return { success: false, message: 'Email sending is disabled' };
        }
    }
}

module.exports = new MailService();
