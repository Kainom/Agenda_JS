import validator from "validator";
export default class ValidaMenor {
    constructor(formClass,senha) {
        this.formClass = document.querySelector(formClass);
        this.errors = [];
        this.senha = senha;
    }


    checaErros() {
        if (this.errors.length > 0) {
            this.mensagens();
            this.errors = [];
            return true;
        }
        return false;
    }

    campoEmail(email) {
        if (!(validator.isEmail(email.value))) {
            this.errors.push("E-mail inválido");
        }
    }

    campoSenha(senha) {
        if (senha.value.length < 5 || senha.value.length > 50) {
            const tipoDeError = (senha.value.length < 5) ? "A senha precisa ter mais de 5 caracaters" :
                "A senha precisa ter menos de 50 caracaters";
            this.errors.push(tipoDeError);
        }
    }

    testarCampos(e) {
        const el = e.target;
        const email = el.querySelector('input[name="email"]');
        if (this.senha) {
            const senha = el.querySelector('input[name="password"]');
            this.campoSenha(senha)
        }
        this.campoEmail(email);
        if (this.checaErros()) return;

        el.submit();
    }


    remove() {
        const p = [...document.getElementById("tulkas").querySelectorAll(".add")];
        const remove = document.getElementById("tulkas");
        p.map((e) => {
            remove.removeChild(e);
            return;
        });
    }

    mensagens() {
        this.errors.forEach((e) => {
            const p = document.createElement("p");
            p.innerHTML = e;
            p.style.backgroundColor = "#902bb4";
            p.style.borderRadius = "15px";
            p.classList.add("text-center");
            p.classList.add("my-2");
            p.classList.add("add");
            document.getElementById("tulkas").insertAdjacentElement('afterbegin', p);
        })
    }



    camposNull(el) {
        const campos = [...el.querySelectorAll(".form-control")];
        let i = 0;
        campos.map((e) => {
            if (e.value === '' && i === 0) {
                this.errors.push("Preencha os campos");
                i++;
            }
            return e;
        })

    }

    events() {
        if (!this.formClass) return;

        this.formClass.addEventListener('submit', e => {
            const el = e.target;
            this.remove();
            e.preventDefault();
            this.camposNull(el);
            if (this.checaErros()) return;
            this.testarCampos(e);
        })

    }

    validar() {
        this.events();
    }


}