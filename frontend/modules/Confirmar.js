

export default class Confirmar {
    constructor(form) {
        this.form = document.querySelector(form);
    }


    confirm() {
        this.confirming();
    }
    confirming() {
        if(this.form === null) return;
        this.form.addEventListener('submit',(e) => {
            const el = e.target;
            e.preventDefault();
             const choice = window.confirm("Deseja realmente deletar sua conta?"); 
                if (choice) 
                el.submit();
        })
    }
}