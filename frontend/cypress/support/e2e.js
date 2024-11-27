//import './commands'; // Exemplo: carregar comandos customizados
Cypress.on('uncaught:exception', (err) => {
    // Ignore o erro de hidratação
    if (err.message.includes('Hydration failed') || err.message.includes('hydrating') ) {
      return false;
    }
    // Permita outros erros serem reportados
    return true;
  });
  