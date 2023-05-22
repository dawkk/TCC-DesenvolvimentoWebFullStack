import { address2, user } from "./user";

describe('User checkout steps after choosing dishes and cart', () => {

  it.skip('should enter wrong credentials for password, and click login button', () => {
    cy.visit('http://localhost:3000/checkout');

    cy.get('input#email').type(user.email);
    cy.get('input#password').type('passwords');
    cy.get('button[type="submit"]').click();
    cy.get('div.MuiAlert-root').should('be.visible')

  });

  it.skip('should login, choose address, click to create new address, fill and display error messages for incorrect field formats', () => {
    cy.visit('http://localhost:3000/checkout');
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.wait(4000);
    cy.get('button.MuiButton-root').contains('Continuar').click();
    cy.get('[data-testid="address-0"]').click();
    cy.get('[data-testid="checkout-address-create-address"]').click();
    cy.url().should('include', 'http://localhost:3000/checkout/address');
    cy.get('input#street').type(user.street);
    cy.get('input#number').type(user.number);
    cy.get('input#neighborhood').type(user.neighborhood);
    cy.get('input#city').type(user.city);
    cy.get('input#state').type(user.state);
    cy.get('input#zipcode').type('13820000');
    cy.get('input#additionalInfo').type(user.additionalInfo);
    cy.get('#helper-text-zipcode-signup')
      .should('be.visible')
      .should('contain', 'Formato inválido, deve ser XXXXX-XXX');
  });

  it.skip('should login, choose address, create new address, choose payment method and on review page receive errors for empty cart and use all return buttons', () => {
    cy.visit('http://localhost:3000/checkout');
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.wait(4000);
    cy.get('button.MuiButton-root').contains('Continuar').click();
    cy.get('[data-testid="address-0"]').click();
    cy.url().should('include', 'http://localhost:3000/checkout/address');

    cy.get('[data-testid="checkout-address-create-address"]').click();
    cy.get('input#street').type(address2.street);
    cy.get('input#number').type(address2.number);
    cy.get('input#neighborhood').type(address2.neighborhood);
    cy.get('input#city').type(address2.city);
    cy.get('input#state').type(address2.state);
    cy.get('input#zipcode').type(address2.zipcode);
    cy.get('input#additionalInfo').type(address2.additionalInfo);
    cy.get('button.MuiButton-containedPrimary[type="submit"]').contains('Criar Endereço') .click(); 
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('[data-testid="address-1"]').click();
    cy.get('[data-testid="checkout-address-continue"]').click();

    cy.wait(2000);
    cy.get('[data-testid="paymentMethod-0"]').click();
    cy.get('[data-testid="checkout-payment-continue"]').click();

    cy.get('p.MuiTypography-root.MuiTypography-body1.MuiTypography-alignCenter.css-1w1ysa4-MuiTypography-root').should('be.visible');
    cy.get('button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.css-1d4o4yl-MuiButtonBase-root-MuiButton-root').should('be.visible').should('have.class', 'Mui-disabled');
    cy.get('[data-testid="checkout-review-return"]').click();
    cy.url().should('include', 'http://localhost:3000/menu');

  });

  it.skip('should login, choose address, click to create new address creates new address, choose payment, review checkout and continue', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click(); /* Menu Hamburguer Open */
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

    cy.url().should('include', 'http://localhost:3000/checkout');
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.wait(4000);
    cy.get('button.MuiButton-root').contains('Continuar').click();
    cy.get('[data-testid="address-0"]').click();
    cy.url().should('include', 'http://localhost:3000/checkout/address');

    cy.get('[data-testid="checkout-address-create-address"]').click();
    cy.get('input#street').type(address2.street);
    cy.get('input#number').type(address2.number);
    cy.get('input#neighborhood').type(address2.neighborhood);
    cy.get('input#city').type(address2.city);
    cy.get('input#state').type(address2.state);
    cy.get('input#zipcode').type(address2.zipcode);
    cy.get('input#additionalInfo').type(address2.additionalInfo);
    cy.get('button.MuiButton-containedPrimary[type="submit"]').contains('Criar Endereço') .click(); 
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('[data-testid="address-1"]').click();

    cy.get('[data-testid="checkout-address-continue"]').click();
    cy.wait(2000);

    cy.get('[data-testid="paymentMethod-0"]').click();
    cy.get('[data-testid="checkout-payment-continue"]').click();
    cy.get('[data-testid="checkout-review-continue"]').click();
    cy.get('a.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.css-1yyfchd-MuiButtonBase-root-MuiButton-root').click();

   
  });


});