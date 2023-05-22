import { adminUsername, adminPassword } from "./admin";
import 'cypress-file-upload'

describe('Staff Orders', () => {
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
    cy.get('[data-testid="menu-staff-orders"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/orders');
  });

  
  it('Staff orders changing status', () => {
    cy.get('[data-testid="orders-button-accept-0"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(2000);
    cy.get('[data-testid="orders-status-button-sort-1"]').click();
    cy.get('[data-testid="orders-button-reject-0"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('[data-testid="orders-status-button-sort-4"]').click();
    cy.get('[data-testid="orders-status-button-sort-5"]').click();
  });

  
  

});