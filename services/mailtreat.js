const Verify = require("email-validator");

function mailTV(mail) {
  // T
  mail = mail.toLowerCase();

  // V
  try {
    if (Verify.validate(mail)) {
      console.log("E-mail verificado");
      return mail;
    } else {
      throw new Error("O email fornecido não é válido");
    }
  } catch (err) {
    throw new Error("Erro ao tratar email: " + err.message);
  }
}

module.exports = mailTV;
