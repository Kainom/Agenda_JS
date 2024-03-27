const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require("bcryptjs");

const CadastroSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  idade: { type: Number, required: true },
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  sexo: { type: String, required: true }
});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    console.log(this.body);
    if(this.body.sexo === "Omitir"){
      this.body.sexo = "Omitido";
    } else{
      this.body.sexo = (this.body.sexo === "1") ? "Masculino" : "Feminino";
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      idade: this.body.idade,
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      sexo: this.body.sexo
    }
  }
  valida() {
    this.cleanUp();
    if (!(validator.isEmail(this.body.email)))
      this.errors.push("E-mail inválido");
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("A sennha precisa ter entre 3  e 50 caracteres");
    }


  }
  async userExists() {
    this.user = await CadastroModel.findOne({ email: this.body.email })
    console.log(this.user);
    if (this.user) this.errors.push("Usuário ja existe");
  }


  async login() {
    this.valida();
    if (this.errors.length > 0) return;
    this.user = await CadastroModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }


  async register() {
    this.valida();
    if (this.errors.length > 0) {
      return;
    }
    await this.userExists();
    if (this.body.nome.search(/[0-9]/) !== -1) this.errors.push("Nome não pode conter números");
    if (this.body.sobrenome.search(/[0-9]/) !== -1) this.errors.push("Sobrenome não pode conter números");


    if (this.errors.length > 0) {
      return;
    }
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await CadastroModel.create(this.body);
  }



}

module.exports = Cadastro;