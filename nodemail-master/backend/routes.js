const express = require('express'); 
const upload = require("multer")();
const routes = express.Router()

routes.post('/send', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const anexo = req.file;
    require("./Controller/EmailController")(email, nome, mensagem, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
}) 

module.exports = routes