const Cadastro = require("../models/CadastroModel");

exports.index = (req, res) => {
    if (req.session.user) return res.render("login-logado")
    res.render("cadastro");
};

exports.register = async (req, res) => {
    try {
        const cadastro = new Cadastro(req.body);
        await cadastro.register();

        if (cadastro.errors.length > 0) {
            req.flash("errors", cadastro.errors);
            req.session.save(function () {
                return res.redirect("back");
            });
            return;
        }
        req.flash("success", "Usuário criado com  sucesso");
        req.session.save(function () {
            res.redirect("back");
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }

}

exports.edit = async function (req, res, next) {
    try {
        const cadastro = new Cadastro(req.body,true);
        console.log(req.session.user +"ude");
        await cadastro.editar(req.session.user._id);
        if (cadastro.errors.length > 0) {
            req.flash("errors", cadastro.errors);
            req.session.save(() => res.redirect("back"));
            return;
        }
        const user = await cadastro.buscar(req.session.user._id);
        console.log(user);
        req.session.user.nome = user.nome;
        req.session.user.sobrenome = user.sobrenome;
        req.session.user.email = user.email;
        req.session.user.idade = user.idade;
        req.session.user.sexo = user.sexo;


        next();
    } catch (error) {
        console.log(error);
        res.render('404');
    }
}