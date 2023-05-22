import { adminUsername, adminPassword } from "./admin";
import 'cypress-file-upload'

describe('Staff Dishes', () => {
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
    cy.get('[data-testid="menu-staff-dishes"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/dishes');
  });

  it.skip('Staff dishes displays view PDF', () => {

    cy.get('button[data-testid="dish-pdf-view"]').click();
    cy.get('iframe[src^="blob"]').should('be.visible');
  });
  
  it.skip('Staff dishes download PDF', () => {

    cy.get('button[data-testid="dish-pdf-download"]').click();
    cy.readFile('cypress/downloads/pratos.pdf').should('exist');
  });

  it.skip('Staff dishes creating dish', () => {

    cy.contains('a.MuiButtonBase-root', 'Adicionar Novo Prato').click();
    cy.get('input#title').type('Fraldinha no molho de mostarda');
    cy.get('input#price').type('45');
    cy.get('input#description').type('Fraldinha temperada com molho');
    cy.get('div#menu').click();
    cy.get('[data-testid="menu-created-0"]').click();


   /*  cy.fixture('brigadeiro.jpg', 'base64').then(fileContent => {
      cy.get('[data-testid="button-image-upload"]').click();
      cy.wait(3000);
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName: 'brigadeiro.jpg',
        mimeType: 'image/jpeg'
      });
      cy.wait(3000);
    });
    cy.screenshot('image_preview');
    cy.wait(4000);
    cy.get('img[data-testid="image-uploaded-preview"]').should('be.visible'); */


    cy.get('[data-testid="button-create-dish"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/staff/dishes');

  });

  it.skip('Staff dishes edit dish', () => {

    cy.get('[data-testid="dish-edit-0"]').click();

    cy.get('input#title').click().clear().type('Fraldinha no Barbecue');
    cy.get('input#price').click().clear().type('30');
    cy.get('textarea#description').click().clear().type(' barbecue da casa');
    cy.get('[data-testid="button-select-menus"]').click();
    cy.get('[data-testid="menu-created-1"]').click();

   /*  cy.fixture('brigadeiro.jpg').then(fileContent => {
      cy.get('label.MuiButtonBase-root').click();
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName: 'brigadeiro.jpg',
        mimeType: 'image/jpg'
      });
    });
    cy.get('[data-testid="save-image-button"]').click(); */


    cy.get('[data-testid="button-edit-dish"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/staff/dishes');

  });

  it.skip('Staff dishes delete dish', () => {

    cy.get('[data-testid="dish-delete-1"]').click();
    cy.get('.MuiAlert-message').should('be.visible');

  });

  
  

});