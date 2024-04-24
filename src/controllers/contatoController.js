const Contato = require("../models/ContatoModel");



exports.index = function(req, res, next) {
    res.render("contato",{
       contato:{}
    });
  next();
}


exports.register = async function (req, res, next) {
  try {
    const contato = new Contato(req.body,req.session.user);
    await contato.register();
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contato/index"));
      return; 
    }

    req.flash("success", "Contato adicionado com sucesso");
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
    return;
  } catch (e) {
    console.log(e);
    return res.render("404");
  }

};


exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const contato = await Contato.buscaPorId(req.params.id);
  if(!contato) return res.render('404');

  res.render('contato', { contato });
};

exports.edit = async function(req, res) {
  try {
    console.log(req.body);
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body,req.session.user);
    await contato.edit(req.params.id);

    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('perfil'));
      return;
    }

    req.flash('success', 'Contato editado com sucesso.');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
    return;
  } catch(e) {
    console.log(e);
    res.render('404');
  }
};


exports.delete = async (req,res) => { 
  if(!req.params.id) return res.render('404');

  const contato = await Contato.delete(req.params.id);
  if(!contato) return res.render('404');

  req.flash('success','Contato deletado com sucesso ')
  req.session.save(() => res.redirect('back'));
  return;
};
