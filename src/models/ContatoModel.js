const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  numero: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  criadoEm: { type: Date, default: Date.now },
  user: { type: String, required: true }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body, user) {
  this.body = body;
  this.errors = [];
  this.contato = null;
  this.quantidade = 0;
  this.user = user._id

};

Contato.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};


Contato.prototype.register = async function () {
  this.valida();
  this.quantidade = await this.buscaQuantidade();
  if (this.errors.length > 0) return;
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
    user: this.user,
  }
};
Contato.prototype.valida = function () {
  this.cleanUp(); 

  if (this.body.email && !(validator.isEmail(this.body.email))) this.errors.push("E-mail inválido");
  if (!(this.body.nome)) this.errors.push("Nome é um campo obrigatório");
  if (!(this.body.email) && !(this.body.numero)) this.errors.push("O contato deve ter um email ou número");
  if (this.body.nome.search(/[0-9]/) !== -1) this.errors.push("Nome não pode conter números");
  if (this.body.sobrenome.search(/[0-9]/) !== -1) this.errors.push("Sobrenome não pode conter números");

};

Contato.prototype.buscaQuantidade = async function () {

  this.quantidade = await ContatoModel.countDocuments({'user': this.user });
  console.log(this.quantidade);
  return this.quantidade;


};



Contato.prototype.buscaContatos = async function () {
  const contatos = await ContatoModel.find({'user':this.user}).sort({criadoEm:-1}); // -1 decrescnte 1 crescente
  console.log(contatos.length);
  return contatos
};
  // Métodos estáticos

Contato.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
};

Contato.delete = async (id) => {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findOneAndDelete({"_id":id});
  console.log(contato);
  return contato;
};



module.exports = Contato;