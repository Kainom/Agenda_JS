import ValidaMenor from "./ValidaMenor";


export default class ValidaMaior extends ValidaMenor {
    constructor(formClass, senha) {
        super(formClass, senha);

    }


    campoNomeAndSobrenome(el) {
        console.log(this);
        const nome = el.querySelector('input[name="nome"]');
        const sobrenome = el.querySelector('input[name="sobrenome"]');
        const campos = [nome, sobrenome];
        const nomeCampo = ['Nome', 'Sobrenome'];

        // this.camposNull(el);
        console.log("nao chegou")
        if (this.checaErros()) return;
        console.log("chegou")
        for (let i in campos) {
            console.log(i);
            if (campos[i].value.length < 3 || campos[i].value.length > 50) {
                const tipoDeError = (campos[i].value.length < 3) ? `O ${nomeCampo[i]} Precisa ter mais de 2 caracteres` :
                    `O ${nomeCampo[i]} Precisa ter menos de 50 caracaters`;
                this.errors.push(tipoDeError);
            }
            if (campos[i].value.search(/[0-9]/) !== -1) this.errors.push(`${nomeCampo[i]} não pode conter números`);
        }
        return this.checaErros();
    }

    events() {
        if (!this.formClass) return;
        this.formClass.addEventListener('submit', e => {
           e.preventDefault();
            const el = e.target;
            this.remove();
            this.camposNull(el);
            if (this.checaErros()) return;
            if (this.campoNomeAndSobrenome(el)) return;
            this.testarCampos(e);
        })
    }
    validar(input) {
        this.events(input);
    }
}