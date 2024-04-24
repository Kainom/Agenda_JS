const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const cadastroController = require('./src/controllers/cadastroController');
const perfilController = require('./src/controllers/perfilController');
const contatoController = require('./src/controllers/contatoController');
const {loginRequired} = require('./src/middlewares/middleware');
const pictureController = require('./src/controllers/pictureController');
const upload = require('./config/multer');
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
route.get('/perfil/index',loginRequired,pictureController.findAll,perfilController.index);
route.get('/perfil/indexEdit',loginRequired,pictureController.findAll,perfilController.indexEdit);
route.delete("perfil/index/:id",loginRequired,pictureController.remove);
route.post("/perfil/register",loginRequired,upload.single("img"),cadastroController.edit,pictureController.teste,pictureController.remove,pictureController.create);
route.post("/perfil/delete",loginRequired,pictureController.remove,perfilController.deletar);
//rotas do contato

route.get('/contato/index',loginRequired,contatoController.index);
route.post('/contato/register',loginRequired,contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id',loginRequired,contatoController.delete);


module.exports = route;
