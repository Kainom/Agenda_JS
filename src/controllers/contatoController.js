const Contato = require("../models/ContatoModel");



exports.index = function (req, res, next) {
  if (req.session.user) {
    res.render("criarContato");
  } else {
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
}

exports.register = async function (req, res, next) {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contato/index"));
      return; 
    }

    req.flash("success", "Contato adicionado com sucesso");
    req.session.save(() => res.redirect("back"));
    return;
  } catch (e) {
    console.log(e);
    return res.render("404");
  }

};