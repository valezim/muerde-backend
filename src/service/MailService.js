const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const purchaseConfirmationHTML = fs.readFileSync('src/email_templates/purchaseConfirmation.html', 'utf-8');
const reviewRequestHTML = fs.readFileSync('src/email_templates/reviewRequest.html', 'utf-8');
let isEmailEnabled;

class MailService {
    constructor() {
        this.isEmailEnabled = true;
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

    toggleEmailStatus() { 
        this.isEmailEnabled = !this.isEmailEnabled;
    }

    async sendPurchaseConfirmation(email) {
        if (!this.isEmailEnabled) {
            return { success: false, error: 'El envío de correo está deshabilitado' };
        }
        try {
            let mailOptions = {
                from: 'Muerde Repostería <muerde.reposteria@outlook.com>',
                to: email,
                subject: "Confirmación de compra",
                text: "Gracias por tu compra",
                html: purchaseConfirmationHTML,
            };
    
            const result = await this.transporter.sendMail(mailOptions);
            return { success: true, result };
        } catch (error) {
            console.error("Error enviando correo de confirmación de compra:", error);
            return { success: false, error };
        }
    }
    
    async sendReviewRequest(email) {
        if (!this.isEmailEnabled) {
            return { success: false, error: 'El envío de correo está deshabilitado' };
        }
        try {
            let mailOptions = {
                from: 'Muerde Repostería <muerde.reposteria@outlook.com>',
                to: email,
                subject: "Solicitud de reseña",
                text: "Por favor, deja una reseña para tu reciente compra",
                html: reviewRequestHTML,
            };
    
            const result = await this.transporter.sendMail(mailOptions);
            return { success: true, result };
        } catch (error) {
            console.error("Error enviando correo de solicitud de reseña:", error);
            return { success: false, error };
        }
    }    
}

module.exports = new MailService();