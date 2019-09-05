const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        console.log('NODE_ENV', process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'production') {
            //sendgrid
            console.log('creating sendGrid transport');
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }

        return nodemailer.createTransport(
            // {
            //     host: process.env.EMAIL_HOST,
            //     port: process.env.EMAIL_PORT,
            //     auth: {
            //         user: process.env.EMAIL_USERNAME,
            //         pass: process.env.EMAIL_PASSWORD
            //     }
            // }
            {
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: 'e1c432f7a5fbf3',
                    pass: '872d0c4c56cb92'
                }
            }
        );
    }

    async send(template, subject) {
        //1) Render HTML based on pug template
        const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`,
            {
                firstName: this.firstName,
                url: this.url,
                subject
            }
        );

        //2) define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        //3) create a transporter
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!');
    }

    async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Your password reset token (valid for only 10 minutes)'
        );
    }
};
