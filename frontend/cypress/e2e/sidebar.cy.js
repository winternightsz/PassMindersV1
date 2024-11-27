describe("Navegacao na Sidebar - Abrir Pasta", () => {
  it("Deve abrir a pasta ao clicar no nome da pasta na sidebar", () => {
    //isso aqui vai interceptar pra pegar os dados
    cy.intercept("GET", "/findFolders").as("getFolders");
    cy.visit("/mainp");

    //espera o api pra pegar as pastas
    cy.wait("@getFolders").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      cy.log("Response body:", response.body); //pra checar

      const folderId = response.body[0].id; //bota o id da primeira pasta
      cy.get(`[data-cy="folder-lado"][data-id="${folderId}"]`).click(); //procura pelos elementos data-cy
    });
  });
});

describe("Navegacao na Sidebar - Abrir Pasta", () => {
  it("Deve abrir a pasta ao clicar no nome da pasta na sidebar e verificar o nome da pasta", () => {
    cy.intercept("GET", "/findFolders").as("getFolders");

    cy.visit("/mainp");

    //vai esperar o api pra pegar as pastas
    cy.wait("@getFolders").then(({ response }) => {
      cy.log("Response Body:", JSON.stringify(response.body)); //pra checar

      expect(response.body).to.be.an("array").that.is.not.empty;

      const folderName = response.body[0]?.nome; //bota o nome da primeira pasta
      const folderId = response.body[0]?.id; //bota o id da primeira pasta

      expect(folderName).to.be.a("string", "Nome da pasta está definido");
      cy.get(`[data-cy="folder-lado"][data-id="${folderId}"]`).click(); //procura pelos elementos data-cy

      //verifica se o nome da pasta aparece
      cy.contains(folderName).should("be.visible");
    });
  });
});

describe("Navegacao na Sidebar - Verificar nomes de pastas", () => {
  it("Deve verificar que o nome de cada pasta corresponde ao nome que mostrar ao abrir", () => {
    cy.intercept("GET", "/findFolders").as("getFolders");
    cy.visit("/mainp");

    cy.wait("@getFolders").then(({ response }) => {
      expect(response.statusCode).to.eq(200);

      const folders = response.body;
      expect(folders).to.be.an("array").and.not.to.be.empty;

      folders.forEach((folder) => {
        cy.get(`[data-cy="folder-lado"][data-id="${folder.id}"]`)
          .should("be.visible")
          .click();

        cy.contains('[data-cy="folder-nome"]', folder.nome).should(
          "be.visible"
        );

        //volta pra pro Main Page pra ver a proxima pasta
        cy.get('[data-cy="voltar-main"]').click();
      });
    });
  });
});

//npx cypress run --spec cypress/e2e/sidebar.cy.js