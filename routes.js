const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const cadastroController = require('./src/controllers/cadastroController');
const perfilController = require('./src/controllers/perfilController');
const contatoController = require('./src/controllers/contatoController')
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
route.get('/perfil/index',perfilController.index);

//rotas do contato

route.get('/contato/index',contatoController.index);
route.post('/contato/register',contatoController.register);


module.exports = route;
