const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { nome, email, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seuemail@gmail.com', // Seu e-mail
            pass: 'suasenha' // Sua senha
        }
    });

    const mailOptions = {
        from: email,
        to: 'seuemail@gmail.com', // Substitua pelo e-mail que receberá as mensagens
        subject: 'Nova mensagem do site CannaSphere',
        text: `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar a mensagem.');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.status(200).send('Mensagem enviada com sucesso!');
        }
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
