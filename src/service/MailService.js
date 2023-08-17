const nodemailer = require('nodemailer');
require('dotenv').config();

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
            text: "Gracias por su compra",
            html: "<b>Gracias por su compra</b>",
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async sendReviewRequest(email) {
        let mailOptions = {
            from: 'Muerde Repostería <muerde.reposteria@outlook.com>',
            to: email,
            subject: "Solicitud de reseña",
            text: "Por favor, deje una reseña para su reciente compra",
            html: "<b>Por favor, deje una reseña para su reciente compra</b>",
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new MailService();