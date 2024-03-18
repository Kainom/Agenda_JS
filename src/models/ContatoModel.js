const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  numero: { type: Number, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  criadoEm: { type: Date, default: Date.now },
  quantidade: { type: Boolean, required: true }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
  this.quantidade = false;
  this.contatos = 0;
};

Contato.prototype.register = async function () {
  this.valida();
  await this.buscaQuantidade();
  if (this.errors.length > 0) return;
  this.body.quantidade = true;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    numero: this.body.telefone,
    email: this.body.email,
    quantidade: this.body.quantidade
  }
};
Contato.prototype.valida = function () {
  this.cleanUp();

  if (this.body.email && !(validator.isEmail(this.body.email))) this.errors.push("E-mail inválido");
  if (!(this.body.nome)) this.errors.push("Nome é um campo obrigatório");
  if (!(this.body.email) && !(this.body.numero)) this.errors.push("O contato deve ter um email ou número");
  if (this.body.nome.search(/[0-9]/) !== -1) this.errors.push("Nome não pode conter números");
};

Contato.prototype.buscaQuantidade = async function () {
  //  this.body.quantidade =  await ContatoModel.findOne({ quantidade: this.body.quantidade });
  this.contatos = await ContatoModel.countDocuments({});
  console.log(this.contatos);
  return this.contatos;
};

module.exports = Contato;