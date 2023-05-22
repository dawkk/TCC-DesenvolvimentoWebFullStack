import { adminUsername, adminPassword } from "./admin";
import 'cypress-file-upload'

describe('Staff Menus', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');

    cy.get('input#email').type(adminUsername);
    cy.get('input#password').type(adminPassword);
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('[data-testid="menu-staff-expand-collapse"]').click();
    cy.get('[data-testid="menu-staff-menus"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/menus');
  });

  it.skip('Staff menus displays view PDF', () => {

    cy.get('button[data-testid="menu-pdf-view"]').click();
    cy.get('iframe[src^="blob"]').should('be.visible');
  });

  it.skip('Staff menus download PDF', () => {
    cy.get('button[data-testid="menu-pdf-download"]').click();
    cy.readFile('cypress/downloads/menus.pdf').should('exist');
  });

  it.skip('Staff creating menu', () => {

    cy.contains('a.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium', 'Adicionar Novo Menu').click();
    cy.get('input#name').type('Drinks');


   /*  cy.fixture('brigadeiro.jpg', 'base64').then(fileContent => {
      cy.get('[data-testid="button-image-upload"]').click();
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName: 'brigadeiro.jpg',
        mimeType: 'image/jpeg'
      });
    });
    cy.get('img[data-testid="image-uploaded-preview"]').should('be.visible'); */


    cy.get('[data-testid="button-create-menu"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/staff/menus');

  });

  it.skip('Staff edit menu', () => {

    cy.get('[data-testid="menu-edit-0"]').click();
    cy.get('input#name').clear().type('Drinks');

  /*   
    cy.fixture('brigadeiro.jpg', 'base64').then(fileContent => {
      cy.get('[data-testid="button-image-upload"]').click();
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName: 'brigadeiro.jpg',
        mimeType: 'image/jpeg'
      });
    });
    cy.get('img[data-testid="image-uploaded-preview"]').should('be.visible');
    cy.get('[data-testid="save-image-button"]').click(); */

    cy.get('[data-testid="button-edit-menu"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/staff/menus');

  });

  it.skip('Staff delete menu', () => {

    cy.get('[data-testid="menu-delete-1"]').click();
    cy.get('.MuiAlert-message').should('be.visible');

  });

});