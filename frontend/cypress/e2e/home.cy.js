describe('Navegação Página Home', () => {
    it('Deve entrar na página de login quando o botão "Fazer login" for clicado', () => {
      // Visita a Home Page
      cy.visit('/'); // Substitua pela URL real da Home Page
  
      // Seleciona o botão pelo atributo data-cy e clica
      cy.get('[data-cy="botao-login"]').should('be.visible').click();
      cy.wait(5000);
      // Verifica se a URL mudou para a página de login
      cy.url().should('include', '/login');
  
      // Opcional: verifica o título ou elemento específico da página de login
      cy.contains('Login').should('be.visible'); // Substitua "Login" pelo texto esperado na página de login
    });
  
    it('Deve entrar na página de cadastro quando o botão "INSCREVA-SE" for clicado', () => {
      // Visita a Home Page
      cy.visit('/'); // Substitua pela URL real da Home Page
  
      // Seleciona o botão pelo atributo data-cy e clica
      cy.get('[data-cy="botao-cadastro"]').should('be.visible').click().click();
      cy.wait(5000);
      // Verifica se a URL mudou para a página de cadastro
      cy.url().should('include', '/cadastro');
  
      // Opcional: verifica o título ou elemento específico da página de cadastro
      cy.contains('Cadastro').should('be.visible'); // Substitua "Cadastro" pelo texto esperado na página de cadastro
    });
  });
  