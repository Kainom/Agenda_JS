import '../node_modules/core-js/stable';
import '../node_modules/regenerator-runtime/runtime';
import './assets/css/style.css';

import Login from './modules/ValidaMenor';
import Cadastro from './modules/ValidaMaior';
import Contato from './modules/ValidaMaior';
import Confirmar from './modules/Confirmar';

const login = new Login('.form-login', true)
const cadastro = new Cadastro('.form-cadastro', true);
const contato = new Contato('.form-contato', false);
const confimar = new Confirmar('.form-deletar');
const input = document.getElementById("fupload");
const img = [...document.getElementsByTagName('img')];
        
const fReader = new FileReader();

if(input.files[0]){
fReader.readAsDataURL(input.files[0]);
console.log("opa");
fReader.onloadend = function(event){
        const caminho =`./kainom/Pictures/${input.files[0].name}`;
        console.log(caminho);
        console.log(img);
        img[0].src = event.target.result;       
}}

login.validar();
cadastro.validar();
contato.validar();
confimar.confirm();
