import { adminUsername, adminPassword } from "./admin";
import 'cypress-file-upload'

describe('Staff Users', () => {
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
    cy.get('[data-testid="menu-staff-users"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/users');
  });

  it('Staff users list and user details', () => {
    cy.get('a[data-testid="button-user-details-0"]').click();
  });


});