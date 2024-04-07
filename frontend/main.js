import '../node_modules/core-js/stable';
import '../node_modules/regenerator-runtime/runtime';
import './assets/css/style.css';

import Login from './modules/ValidaMenor';
import Cadastro from './modules/ValidaMaior';
import Contato from './modules/ValidaMaior';

const login     =   new Login('.form-login', true)
const cadastro  =   new Cadastro('.form-cadastro', true);
const contato   =   new Contato('.form-contato', false);

login.validar();
cadastro.validar();
contato.validar();