//checar se o botao de abrir pasta funciona
describe('Navegacao na Main Page - Abrir Pasta', () => {
  it('Deve abrir a pasta ao clicar no botão "Abrir Pasta"', () => {
    
    cy.visit('/mainp');//visita a Main Page
    
    cy.contains('Abrir Pasta').should('be.visible').click(); //verifica se o botao de abrir pasta esta visivel e dai clica

    cy.contains('Voltar para Main Page').should('be.visible');  //verifica se ta escrito voltar para main page da página ta ali
  });
});

//checar abrir pasta funciona na sidebar
describe('Navegacao na Sidebar - Abrir Pasta', () => {
  it('Deve abrir a pasta ao clicar no nome da pasta na sidebar', () => {    
   cy.visit('/mainp');
    
    cy.get('[data-cy="folder-lado"]').eq(0).should('be.visible').click();
   
    cy.contains('Voltar para Main Page').should('be.visible'); 
  });
});

//npx cypress run --spec cypress/e2e/home.cy.js