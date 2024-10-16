// validations.js

// Verificar se o campo está vazio
export const isNotEmpty = (value) => {
    return value.trim() !== '';
  };
  
  // Verificar se o email tem o formato correto
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  