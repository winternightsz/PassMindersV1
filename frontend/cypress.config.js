const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // URL do Codespaces
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Caminho dos testes E2E
    supportFile: 'cypress/support/e2e.js', // Arquivo de suporte global
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'electron') {
          launchOptions.preferences['remote-allow-origins'] = '*'; // Permitir todas as origens
        }
        return launchOptions;
      });
    },
  },
});
