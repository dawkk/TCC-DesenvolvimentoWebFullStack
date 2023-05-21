import { user } from "./user";

describe('User registration', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
    cy.contains('Registre-se').click();
    cy.url().should('include', 'http://localhost:3000/register');
  });

  it.skip('should display error messages for missing mandatory fields', () => {

    cy.get('button[type="submit"]').click();
    cy.get('#helper-text-firstname-signup').should('be.visible').contains('Nome Obrigatório');
    cy.get('#helper-text-lastname-signup').should('be.visible').contains('Sobrenome Obrigatório');
    cy.get('#helper-text-cellphone-signup').should('be.visible').contains('Celular Obrigatório');
    cy.get('#helper-text-email-signup').should('be.visible').contains('Email Obrigatório');
    cy.get('#helper-text-password-signup').should('be.visible').contains('Senha Obrigatória');

  });

  it.skip('should display error messages for incorrect field formats', () => {

    cy.get('input#firstName').type(user.firstName);
    cy.get('input#lastName').type(user.lastName)
    cy.get('input#cellphone').type('(00)12345');
    cy.get('input#street').type(user.street);
    cy.get('#helper-text-cellphone-signup')
      .should('be.visible')
      .should('contain', 'Este numero não é valido, o formato deveria ser (XX)XXXXXXXXX');
    cy.get('input#number').type(user.number);
    cy.get('input#neighborhood').type(user.neighborhood);
    cy.get('input#city').type(user.city);
    cy.get('input#state').type(user.state);
    cy.get('input#zipcode').type('13820000');
    cy.get('input#additionalInfo').type(user.additionalInfo);
    cy.get('#helper-text-zipcode-signup')
      .should('be.visible')
      .should('contain', 'Formato inválido, deve ser XXXXX-XXX');
    cy.get('input#email').type('t');
    cy.get('input#password').type('password123');
    cy.get('p#helper-text-email-signup.MuiFormHelperText-root')
      .should('be.visible')

  });



  it.skip('should navigate to register, enter all user info, address info, e-mail and password, and click in register button and be registered', () => {

    cy.get('input#firstName').type(user.firstName);
    cy.get('input#lastName').type(user.lastName);
    cy.get('input#cellphone').type(user.cellphone);
    cy.get('input#street').type(user.street);
    cy.get('input#number').type(user.number);
    cy.get('input#neighborhood').type(user.neighborhood);
    cy.get('input#city').type(user.city);
    cy.get('input#state').type(user.state);
    cy.get('input#zipcode').type(user.zipcode);
    cy.get('input#additionalInfo').type(user.additionalInfo);
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.get('.MuiAlert-message')
      .should('be.visible');
    cy.url().should('include', 'http://localhost:3000/login');

  });

  it.skip('should navigate to login, enter email and password, and click login button', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');

    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it.skip('should not register and display error message if email filled in form is already being used by another user account', () => {

    cy.get('input#firstName').type(user.firstName);
    cy.get('input#lastName').type(user.lastName);
    cy.get('input#cellphone').type(user.cellphone);
    cy.get('input#street').type(user.street);
    cy.get('input#number').type(user.number);
    cy.get('input#neighborhood').type(user.neighborhood);
    cy.get('input#city').type(user.city);
    cy.get('input#state').type(user.state);
    cy.get('input#zipcode').type(user.zipcode);
    cy.get('input#additionalInfo').type(user.additionalInfo);
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.get('.MuiAlert-message')
      .should('be.visible');

  });

  it.skip('should log in as an admin user', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');

    const adminUsername = Cypress.env('ADMIN_USERNAME');
    const adminPassword = Cypress.env('ADMIN_PASSWORD');

    cy.get('input#email').type(adminUsername);
    cy.get('input#password').type(adminPassword);
    cy.get('button[type="submit"]').click();
  });

});