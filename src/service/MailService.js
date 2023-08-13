const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                type: 'OAuth2',
                clientId: '419298149524-t9pp5k998fqcoh140sdlk9uoaivavik0.apps.googleusercontent.com',
                clientSecret: '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',
                refreshToken: '1//0hMYLer4ad6AFCgYIARAAGBESNwF-L9Irw4AbFaVaURzhtKQyUuZtzwCz4DTeBynSHkWRB0a1oCS9UTmjCgMUtCXwHqmjrchLsME'
            }
        });
    }

    async sendPurchaseConfirmation(email) {
        console.log("enviando mail ", email)
        let mailOptions = {
            from: '"Muerde" <muerde.reposteria@gmail.com">',
            to: email,
            subject: "Confirmación de compra",
            text: "Gracias por su compra",
            html: "<b>Gracias por su compra</b>",
        };

        console.log("enviando mail 2 ", mailOptions)

        return await this.transporter.sendMail(mailOptions);
    }

    async sendReviewRequest(email) {
        let mailOptions = {
            from: '"Muerde" <muerde@example.com>',
            to: email,
            subject: "Solicitud de reseña",
            text: "Por favor, deje una reseña para su reciente compra",
            html: "<b>Por favor, deje una reseña para su reciente compra</b>",
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new MailService();