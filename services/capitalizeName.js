function capitalizeName(name) {
    // Função para capitalizar a primeira letra de uma palavra
    const capitalizeWord = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };
  
    // Divida o nome em palavras
    const words = name.split(' ');
  
    // Capitaliza a primeira letra de cada palavra
    const capitalizedWords = words.map(capitalizeWord);
  
    // Junta as palavras capitalizadas de volta em uma string
    return capitalizedWords.join(' ');
  }
module.exports = capitalizeName;