/* Aqui sera tratado a senha do usuario */
const bcrypt = require('bcrypt');
const hasUpper = (str) => /[A-Z]/.test(str);
const regex = /[0-9]/;

async function passTreat(pass) {
    try {
      if (pass.length >= 7 && pass.length <= 50) {
        if (hasUpper(pass)) {
            if (regex.test(pass)) {
                const hashedPassword = await bcrypt.hash(pass, 10);
                return { message: 'Senha Criptografada com sucesso', hashedPassword, pass };
            } else {
                throw new Error('A senha precisa ter um número para ser validada');
            }
        } else {
          throw new Error('A senha precisa ter uma letra maiuscula');
        }
      } else {
        throw new Error('Senha deve ter entre 7 e 50 caracteres');
      }
    } catch (error) {
      return { message: error.message };
    } 
  }
  
  module.exports = passTreat;