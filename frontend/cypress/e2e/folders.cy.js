describe('Carregamento de Pastas e Contas na Pagina Principal', () => {

    //CT09.01
    it('Deve carregar e exibir pastas e contas corretamente na pagina principal', () => {
      
      cy.intercept('GET', '/findFolders').as('getFolders');
      cy.visit('/mainp');
  
      
      cy.wait('@getFolders').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
  
        const folders = response.body;
        expect(folders).to.be.an('array').and.not.to.be.empty;
  
        
        folders.forEach((folder) => {
          cy.contains('[data-cy="folder-nome"]', folder.nome).should('be.visible');//itera sobre as pastas pra ver se estao ali corretas
  
          if (folder.contas && folder.contas.length > 0) {
            
            folder.contas.forEach((conta) => {                                    //vai verificar se todas as contas da pasta sao exibidas
            cy.get(`img[src="${conta.foto_referencia}"]`).should('be.visible');
            });
          } else {
            
            cy.contains('Nenhuma conta adicionada').should('be.visible'); //se nao tiver contas vai ver se mostra a mensagem
          }
        });
      });
    });
  
    //CT09.02
    it('Deve registrar um erro no console ao falhar o carregamento das pastas', () => {
      
      cy.intercept('GET', '/findFolders', { //vai interceptar a requisicao e simular um erro 500
        statusCode: 500,
        body: { error: 'Erro ao carregar pastas' }
      }).as('getFolders');
      cy.visit('/mainp');
  
      
      cy.wait('@getFolders'); //vai esperar a tentativa de carregamento
  
      
      cy.on('window:console', (log) => { //vai validar que um erro foi registrado no console
        if (log.type === 'error') {
          expect(log.message).to.include('Erro ao carregar pastas');
        }
      });

    });
  });
  
  //npx cypress run --spec cypress/e2e/folders.cy.js