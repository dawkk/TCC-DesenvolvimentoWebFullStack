import { address2, user, user2 } from "./user";

describe('User profile options', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.wait(4000);
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('[data-testid="menu-profile"]').click();
  });


  it.skip('should enter profile and edit profile info, and receive error for incorrect field formats', () => {
    cy.get('[data-testid="profile-info"]').click();
    cy.get('#cellphone').click();
    cy.get('#cellphone').clear();
    cy.get('#cellphone').type('987654321');
    cy.get('#firstName').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('Jane');
    cy.get('#helper-text-cellphone-signup')
      .should('be.visible')
      .should('contain', 'Este numero não é valido, o formato deveria ser (XX)XXXXXXXXX');

  });

  it.skip('should enter profile and edit profile info correctly submit', () => {
    cy.get('[data-testid="profile-info"]').click();
    cy.get('#cellphone').click();
    cy.get('#cellphone').clear();
    cy.get('#cellphone').type(user2.cellphone);
    cy.get('#firstName').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(user2.firstName);
    cy.get('button.MuiButton-containedPrimary').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/profile/overview');

  });

  it.skip('should enter profile address and edit address info and receive error for incorrect field formats', () => {
    cy.get('[data-testid="profile-address"]').click();
    cy.get('[data-testid="address-edit-button-0"]').click();
    cy.get('input#street').click().clear().type(user.street);
    cy.get('input#number').click().clear().type(user.number);
    cy.get('input#neighborhood').click().clear().type(user.neighborhood);
    cy.get('input#city').click().clear().type(user.city);
    cy.get('input#state').click().clear().type(user.state);
    cy.get('input#zipcode').click().clear().type('1382000');
    cy.get('input#additionalInfo').click().clear().type(user.additionalInfo);
    cy.get('#helper-text-zipcode-signup')
      .should('be.visible')
      .should('contain', 'Formato inválido, deve ser XXXXX-XXX');

  });

  it.skip('should enter profile address and edit address info correctly', () => {
    cy.get('[data-testid="profile-address"]').click();
    cy.get('[data-testid="address-edit-button-0"]').click();
    cy.get('input#street').click().clear().type(user2.street);
    cy.get('input#number').click().clear().type(user2.number);
    cy.get('input#neighborhood').click().clear().type(user2.neighborhood);
    cy.get('input#city').click().clear().type(user2.city);
    cy.get('input#state').click().clear().type(user2.state);
    cy.get('input#zipcode').click().clear().type(user2.zipcode);
    cy.get('input#additionalInfo').click().clear().type(user2.additionalInfo);
    cy.get('button.MuiButton-containedPrimary').contains('Atualizar Informações').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/profile/address');

  });

  it.skip('should enter profile address, create new address and receive error for incorrect field formats ', () => {
    cy.get('[data-testid="profile-address"]').click();
    cy.contains('Adicionar Novo Endereço').click();
    cy.get('input#street').click().type(user2.street);
    cy.get('input#number').click().type(user2.number);
    cy.get('input#neighborhood').click().type(user2.neighborhood);
    cy.get('input#city').click().type(user2.city);
    cy.get('input#state').click().type(user2.state);
    cy.get('input#zipcode').click().type('1382000');
    cy.get('input#additionalInfo').click().type(user2.additionalInfo);
    cy.get('#helper-text-zipcode-signup').should('be.visible').should('contain', 'Formato inválido, deve ser XXXXX-XXX');
  });

  it.skip('should enter profile address and create new address correctly ', () => {
    cy.get('[data-testid="profile-address"]').click();
    cy.contains('Adicionar Novo Endereço').click();
    cy.get('input#street').click().type(user2.street);
    cy.get('input#number').click().type(user2.number);
    cy.get('input#neighborhood').click().type(user2.neighborhood);
    cy.get('input#city').click().type(user2.city);
    cy.get('input#state').click().type(user2.state);
    cy.get('input#zipcode').click().type(user2.zipcode);
    cy.get('input#additionalInfo').click().type(user2.additionalInfo);
    cy.get('button.MuiButton-containedPrimary').contains('Criar Endereço').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/profile/address');
  });


  it.skip('should enter profile address and delete one address', () => {
    cy.get('[data-testid="profile-address"]').click();
    cy.get('[data-testid="address-delete-button-1"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
  });

  it.skip('should enter profile orders page and see details', () => {
    cy.get('[data-testid="profile-orders"]').click();
    cy.get('[data-testid="profile-orders-0"]').click();

  });


});