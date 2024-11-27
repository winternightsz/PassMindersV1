describe('Verificacao de pastas com e sem contas', () => {
    //CT07.01  e CT07.02
    it('Deve exibir contas ou a mensagem "Nenhuma conta encontrada" quando abrir uma pasta', () => {
      
      cy.intercept('GET', '/findFolders').as('getFolders'); //vai interceptar a requisicao para obter as pastas
      cy.visit('/mainp');
  
      
      cy.wait('@getFolders').then(({ response }) => { //espera a chamada de pastas
        expect(response.statusCode).to.eq(200);
  
        
        const folders = response.body;
        expect(folders).to.be.an('array').and.not.to.be.empty; //vai ver se tem pelo menos uma pasta 
  
        //vai iterar por todas as pastas
        folders.forEach((folder) => {
         
          cy.intercept('GET', `/findAccount/${folder.id}`).as(`getAccounts-${folder.id}`);  //intercepta a chamada pra api de contas
  
          
          cy.get(`[data-cy="folder-lado"][data-id="${folder.id}"]`).click(); //clica na pasta que esta sendo verificada
  
          
          cy.wait(`@getAccounts-${folder.id}`).then(({ response }) => { //espera a chamada das contas dentro da pasta
            expect(response.statusCode).to.be.oneOf([200, 404]);
  
            
            cy.get('[data-cy="folder-nome"]').should('have.text', folder.nome); //vai validar o nome da pasta no FolderDetail
  
            if (response.statusCode === 200) {
              
              const accounts = response.body;  //se a pasta tiver conta ele verifica o nome e os dados
              accounts.forEach((account) => {
                cy.contains(account.titulo).should('be.visible'); //nome da conta
                account.dados.forEach((item) => {
                  cy.contains(item.rotulo).should('be.visible'); //rotulo
                  cy.contains(item.dado).should('be.visible'); //dado
                });
              });
            } else if (response.statusCode === 404) {
              cy.contains('Nenhuma conta adicionada').should('be.visible'); //se a pasta nao tem contas ele checa se aparece a mensagem
            }
          });
  
          //vai voltar para a Main Page antes de ver a proxima pagina
          cy.get('[data-cy="voltar-main"]').click();
        });
      });
    });
  });

  //npx cypress run --spec cypress/e2e/contas.cy.js