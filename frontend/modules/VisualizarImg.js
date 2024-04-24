
export default class VisualizarImg {
        constructor(form,input,photo) {
                this.form = document.querySelector(form);
                this.input = input;
                this.photo = photo;
                this.defaultPhoto = document.getElementById('defaultPhoto');

        }

        visualizarImagem() {
                if (this.input === null) return;
                const fReader = new FileReader();
                this.photo = (this.photo) ? this.photo : this.defaultPhoto;
                this.input.addEventListener('change', (evt) => {
                        if (!(evt.target && evt.target.files && evt.target.files.length > 0)) return;
                        fReader.onload = () => {
                                this.photo.src = fReader.result;

                        }
                        fReader.readAsDataURL(evt.target.files[0]);

                })
        }
}