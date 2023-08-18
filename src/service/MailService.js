const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const purchaseConfirmationHTML = fs.readFileSync('src/email_templates/purchaseConfirmation.html', 'utf-8');
const reviewRequestHTML = fs.readFileSync('src/email_templates/reviewRequest.html', 'utf-8');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: 'muerde.reposteria@outlook.com',
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                ciphers: 'SSLv3',    
                rejectUnauthorized: false
            }
        });
    }

    async sendPurchaseConfirmation(email) {
        let mailOptions = {
            from: 'Muerde Repostería <muerde.reposteria@outlook.com>',
            to: email,
            subject: "Confirmación de compra",
            text: "Gracias por tu compra",
            html: purchaseConfirmationHTML,
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async sendReviewRequest(email) {
        let mailOptions = {
            from: 'Muerde Repostería <muerde.reposteria@outlook.com>',
            to: email,
            subject: "Solicitud de reseña",
            text: "Por favor, deja una reseña para tu reciente compra",
            html: reviewRequestHTML,
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new MailService();