const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const cadastroController = require('./src/controllers/cadastroController');
const perfilController = require('./src/controllers/perfilController');
const contatoController = require('./src/controllers/contatoController');
const {loginRequired} = require('./src/middlewares/middleware');
//const{indexEdit} = require('./src/middlewares/contatoController');
// Rotas da home
route.get('/', homeController.index);


//Rotas de login

route.get('/login/index',loginController.index);
route.post('/login/login',loginController.login);
route.get('/login/logout',loginController.logout)

//rotas de cadastro
route.get('/cadastro/index',cadastroController.index);
route.post('/cadastro/register',cadastroController.register);


//rotas do perfil
route.get('/perfil/index',loginRequired,perfilController.index);

//rotas do contato

route.get('/contato/index',loginRequired,contatoController.index);

route.post('/contato/register',loginRequired,contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id',loginRequired,contatoController.delete);
module.exports = route;
