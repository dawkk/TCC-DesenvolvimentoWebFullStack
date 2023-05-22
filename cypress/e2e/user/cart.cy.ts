import { user } from "./user";

describe('User adding items to and using cart', () => {

  it('should open menu and', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('button[type="submit"]').click();


  });

  it('should open cart without items, try to click on the button to navigate to checkout, and then close the cart', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#cart-menu-open-icon').click();
    cy.wait(4000);
    cy.get('[data-testid="cart-button-navigate-checkout"]').scrollIntoView().should('be.visible').should('have.class', 'Mui-disabled');
    cy.get('#cart-menu-close-icon').click();
  });

  it('should open menu, navigate to cardapio, check available cardapios, list dishes, increase item quantity, descrease item quantity and remove one dish', () => {
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

  });


});