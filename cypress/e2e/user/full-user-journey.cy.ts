import { address2, user, user2 } from "./user";

describe('User full journey in one go', () => {

  it.skip('should register, login, add items to cart, go through checkout create new address, select it, create order, go to profile, go to orders details, change user profile, change user address, add user address, delete user address, all sucessfully', () => {

    /* REGISTRATION */

    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
    cy.contains('Registre-se').click();
    cy.url().should('include', 'http://localhost:3000/register');
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

    /* LOGIN  */

    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.get('.MuiAlert-message').should('contain', 'Login realizado com sucesso! Redirecionando..');
    cy.wait(5000);
    cy.url().should('eq', 'http://localhost:3000/');

    /* CART */

    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click(); 
    cy.get('div.MuiButtonBase-root.MuiListItem-root').contains('Cardápio').click();
    cy.wait(3000);
    cy.scrollTo('bottom');
    cy.get('[data-testid="AddShoppingCartIcon"]').eq(0).click();
    cy.get('[data-testid="AddShoppingCartIcon"]').eq(1).click();
    cy.get('button.MuiButtonBase-root.MuiButton-root.menuButton').contains('Prato Principal').click();
    cy.get('#cart-menu-open-icon').click();
    cy.wait(2000);
    cy.get('[data-testid^="increase-button-"]').eq(0).click();
    cy.get('[data-testid^="decrease-button-"]').eq(0).click();
    cy.get('[data-testid^="remove-button-"]').eq(1).click();
    cy.get('[data-testid="cart-button-navigate-checkout"]').click();
    cy.wait(2000);

    /* CHECKOUT */

    cy.url().should('include', 'http://localhost:3000/checkout');
    cy.get('button.MuiButton-root').contains('Continuar').click();
    cy.get('[data-testid="address-0"]').click();
    cy.url().should('include', 'http://localhost:3000/checkout/address');

    /* CHECKOUT ADDRESS */

    cy.get('[data-testid="checkout-address-create-address"]').click();
    cy.get('input#street').type(address2.street);
    cy.get('input#number').type(address2.number);
    cy.get('input#neighborhood').type(address2.neighborhood);
    cy.get('input#city').type(address2.city);
    cy.get('input#state').type(address2.state);
    cy.get('input#zipcode').type(address2.zipcode);
    cy.get('input#additionalInfo').type(address2.additionalInfo);
    cy.get('button.MuiButton-containedPrimary[type="submit"]').contains('Criar Endereço').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('[data-testid="address-1"]').click();
    cy.get('[data-testid="checkout-address-continue"]').click();
    cy.wait(2000);

    /* CHECKOUT PAYMENT REVIEW AND FINAL SCREEN */

    cy.get('[data-testid="paymentMethod-0"]').click();
    cy.get('[data-testid="checkout-payment-continue"]').click();
    cy.get('[data-testid="checkout-review-continue"]').click();
    cy.get('a.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.css-1yyfchd-MuiButtonBase-root-MuiButton-root').click();

    /* PROFILE ORDERS*/

    cy.get('[data-testid="profile-orders-0"]').click();
    cy.get('[data-testid="profile-orders"]').click();

    /* PROFILE OVERVIEW */
    cy.get('[data-testid="profile-overview"]').click();

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

    /* PROFILE ADDRESS */

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

    cy.get('[data-testid="profile-address"]').click();
    cy.get('[data-testid="address-delete-button-1"]').click();
    cy.get('.MuiAlert-message').should('be.visible');

  });

});