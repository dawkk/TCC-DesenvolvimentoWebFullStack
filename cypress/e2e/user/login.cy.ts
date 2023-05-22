import { user } from "./user";

/* FAZER LOGOUT E PEGAR OS AVISOS DE SUCESSO */

describe('User login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
  });

  it('should enter invalid format email and password', () => {

    cy.get('input#email').type('usuario@@.usuario');
    cy.get('input#password').type(user.password);
    cy.get('p#helper-text-email-signup').should('be.visible')

  });

  it('should enter wrong credentials for password, and click login button', () => {

    cy.get('input#email').type(user.email);
    cy.get('input#password').type('passwords');
    cy.get('button[type="submit"]').click();
    cy.get('div.MuiAlert-root')
    .should('be.visible')

  });

  it('should navigate to login, enter email and password, and click login button', () => {

    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.get('.MuiAlert-message').should('contain', 'Login realizado com sucesso! Redirecionando..');

    cy.wait(5000);
    cy.url().should('eq', 'http://localhost:3000/');
  });

});