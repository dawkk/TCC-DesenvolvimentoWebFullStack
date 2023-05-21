import { user } from "./user";

describe('User registration', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
  });

  it.skip('should open menu and', () => {
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
  

  });
});