// validations.js

// verificar se o campo tá vazio
export const isNotEmpty = (value) => {
    return value.trim() !== '';
  };
  
  // verifica se o email tem o formato certo
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  