const Cadastro = require("../models/CadastroModel");
exports.index = (req,res) => {
    if(req.session.user) return res.render("login-logado")
    res.render("login");
    }
    

exports.login = async function(req, res) {
    try {
      const login = new Cadastro(req.body);
      await login.login();
  
      if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
          return res.redirect('back');
        });
        return;
      }
  
      req.flash('success', 'Você entrou no sistema.');
      req.session.user = login.user;
      req.session.save(function() {
        return res.redirect('back');
      });
    } catch(e) {
      console.log(e);
      return res.render('404');
    }
  };

  exports.logout = async function(req,res){
        req.session.destroy();
        res.redirect('/');
  }  
