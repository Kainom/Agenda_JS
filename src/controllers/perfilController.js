const Cadastro = require('../models/CadastroModel');
const Contato = require('../models/ContatoModel');
const fs = require('fs');

exports.index = (req, res) => {
    console.log(req.pictures);
    let src = null;
    if (req.pictures && fs.existsSync(req.pictures.src))
        src = req.pictures.src;

    res.render('perfil', { src });
};

exports.indexEdit = (req, res) => {
    let src = null;
    if (req.pictures)
        src = req.pictures.src;

    res.render('perfilEdit', { src });
};

exports.deletar = async function (req, res) {
    try {
        const cadastro = new Cadastro(req.body, true);
        const contato = new Contato(req.body, req.session.user);

        await contato.deleteAll();
        await cadastro.delete(req.session.user._id);
        res.redirect('/login/logout');
    } catch (error) {
        console.log(error);
        res.render('404');
    }
}



