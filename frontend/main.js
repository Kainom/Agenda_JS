import '../node_modules/core-js/stable';
import '../node_modules/regenerator-runtime/runtime';
import './assets/css/style.css';

import ValidaMenor from './modules/ValidaMenor';
import ValidaMaior from './modules/ValidaMaior';
import Confirmar from './modules/Confirmar';
import VisualizarImg from './modules/VisualizarImg';

const input = document.getElementById("fupload");
const photo = document.getElementById('photo');
const login = new ValidaMenor('.form-login', true)
const cadastro = new ValidaMaior('.form-cadastro', true);
const contato = new ValidaMaior('.form-contato', false);
const perfil  = new ValidaMaior('.form-perfil',false);
const confimar = new Confirmar('.form-deletar');
const visualizar = new VisualizarImg('.form-perfil',input,photo);



//visualizar e testar imagem
visualizar.visualizarImagem();  
// visualizar.validarImg();


//confirmar ação de remoção
confimar.confirm();

//validar campos 
login.validar();
cadastro.validar();
contato.validar();
perfil.validar();


