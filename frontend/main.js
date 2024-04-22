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

input.addEventListener('change', (evt) => {
        if (!(evt.target && evt.target.files && evt.target.files.length > 0)) {
                return;
        }

        fReader.onload = function (event) {
                img[0].src = fReader.result;
        }
        fReader.readAsDataURL(evt.target.files[0]);
})



login.validar();
cadastro.validar();
contato.validar();
confimar.confirm();
