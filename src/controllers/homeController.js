const Contato = require('../models/ContatoModel')


exports.index  =  async (req, res) => {
  if(req.session.user){
  const contato = new Contato(req.body,req.session.user);
  const contatos = await contato.buscaContatos();
  res.render('index',{contatos});
  } else{
    res.render('logue.ejs');
  } 
  
};

  