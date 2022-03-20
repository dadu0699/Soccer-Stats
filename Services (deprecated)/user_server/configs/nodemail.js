const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

async function dispatchEmail(to, subject, id) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    });

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };

    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = {
        from: 'Soccer Stats <support@soccerstats.com>',
        to,
        subject,
        template: 'validate-mail',
        context:{
            clientID: id
        }
    };

    return await transporter.sendMail(mailOptions);
}

module.exports = dispatchEmail;