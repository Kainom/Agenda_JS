import ValidaMenor from "./ValidaMenor";
import posix, { digit } from 'posix-character-classes';
export default class ValidaMaior extends ValidaMenor {
    constructor(formClass, senha) {
        super(formClass, senha);

    }

    testarCaracter(campos, nomeCampo) {
        for (let i in campos) {
            if (campos[i].value.length < 3 || campos[i].value.length > 50) {
                const tipoDeError = (campos[i].value.length < 3) ? `O ${nomeCampo[i]} Precisa ter mais de 2 caracteres` :
                    `O ${nomeCampo[i]} Precisa ter menos de 50 caracaters`;
                this.errors.push(tipoDeError);
            }
        }
    }

    haveNumber(campos, nomeCampo) {        
        for (let i in campos) {
            if (campos[i].value.search(/[0-9]/) !== -1) this.errors.push(`${nomeCampo[i]} não pode conter números`);
        }

    }


    haveChar(campos, nomeCampo) {
         console.log(campos[0].value.search(/[a-zA-Z]/) !== -1);
         console.log(campos[0].value.match(/\W|_/));
         console.log(posix.alpha);
   
        for (let i in campos){
            if (campos[i].value.search(/[a-zA-Z]/) !== -1 || (campos[i].value.match(/\W|_/))) this.errors.push(`${nomeCampo[i]} não pode conter letras`);

        }
    }

    testarTelefone(el) {
        const campo = [el.querySelector('input[name="telefone"]')];
        const nomeCampos = ['telefone'];
        if (campo) {
            this.haveChar(campo, nomeCampos);
            return this.checaErros();
        }
    }
    campoNomeAndSobrenome(el) {
        const campos = [el.querySelector('input[name="nome"]'), el.querySelector('input[name="sobrenome"]')];
        const nomeCampo = ['Nome', 'Sobrenome'];
        if (this.checaErros()) return;
        this.testarCaracter(campos, nomeCampo);
        this.haveNumber(campos, nomeCampo);
        return this.checaErros();
    }



    events(haveTelefone = false) {
        if (!this.formClass) return;
        this.formClass.addEventListener('submit', e => {
            e.preventDefault();
            const el = e.target;
            this.remove();
            this.camposNull(el);
            if (this.checaErros()) return;
            if (this.campoNomeAndSobrenome(el)) return;
            if (haveTelefone && this.testarTelefone(el)) return;
            this.testarCampos(e);
        })
    }
    validar(haveTelefone) {
        this.events(haveTelefone);
    }
}
