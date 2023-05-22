import { adminUsername, adminPassword } from "./admin";

describe('Staff ', () => {

  it('Full Staff Journey', () => {

    /* Should login */

    cy.visit('http://localhost:3000/');
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('a.MuiTypography-root.MuiLink-root[href="/login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
    cy.get('input#email').type(adminUsername);
    cy.get('input#password').type(adminPassword);
    cy.get('button[type="submit"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);

    /* Should open admin menu and select dashboard, pick dates and generate graph */

    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('[data-testid="menu-staff-expand-collapse"]').click();
    cy.get('[data-testid="menu-staff-dashboard"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/dashboard');
    // Click on the first day element
    cy.get('div.react-datepicker__day.react-datepicker__day--005').click();
    // Click on the second day element
    cy.get('div.react-datepicker__day.react-datepicker__day--025').click();
    // Testing graph
    cy.get('path[name="Total Vendas"]').should('be.visible');
    cy.get('path[name="Total Vendas"]').should('have.attr', 'fill', 'rgba(75, 192, 192, 0.8)');


    /*  */

    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('[data-testid="menu-staff-expand-collapse"]').click();
    cy.get('[data-testid="menu-staff-dishes"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/dishes');

    /* Staff dishes view PDF */

    cy.get('button[data-testid="dish-pdf-view"]').click();
    cy.get('iframe[src^="blob"]').should('be.visible');

    /* Staff dishes download PDF */
    cy.get('button[data-testid="dish-pdf-download"]').click();
    cy.readFile('cypress/downloads/pratos.pdf').should('exist');
    cy.scrollTo('top');

    /* Staff dishes create dish */

    cy.contains('a.MuiButtonBase-root', 'Adicionar Novo Prato').click();
    cy.get('input#title').type('Fraldinha no molho de mostarda');
    cy.get('input#price').type('45');
    cy.get('input#description').type('Fraldinha temperada com molho');
    cy.get('div#menu').click();
    cy.get('[data-testid="menu-created-0"]').click();

    cy.get('[data-testid="button-create-dish"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/staff/dishes');


    /* Staff dishes edit dish */

    cy.get('[data-testid="dish-edit-0"]').click();

    cy.get('input#title').click().clear().type('Fraldinha no Barbecue');
    cy.get('input#price').click().clear().type('30');
    cy.get('textarea#description').click().type(' barbecue da casa');
    cy.get('[data-testid="button-select-menus"]').click();
    cy.get('[data-testid="menu-created-1"]').click();
    cy.get('[data-testid="button-edit-dish"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/staff/dishes');

    /* Staff dishes delete dish */

    cy.get('[data-testid="dish-delete-1"]').click();
    cy.get('.MuiAlert-message').should('be.visible');

    /* MENUS */

    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('[data-testid="menu-staff-expand-collapse"]').click();
    cy.get('[data-testid="menu-staff-menus"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/menus');

    /* Staff menus pdf view */

    cy.get('button[data-testid="menu-pdf-view"]').click();
    cy.get('iframe[src^="blob"]').should('be.visible');

    /* Staff menus pdf download */

    cy.get('button[data-testid="menu-pdf-download"]').click();
    cy.readFile('cypress/downloads/menus.pdf').should('exist');

    /* Staff menu creation */

    cy.contains('a.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium', 'Adicionar Novo Menu').click();
    cy.get('input#name').type('Doces');

    cy.get('[data-testid="button-create-menu"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(3000);
    cy.url().should('include', 'http://localhost:3000/staff/menus');

    /* Staff menu edit */

    cy.get('[data-testid="menu-edit-0"]').click();
    cy.get('input#name').clear().type('Massas');

    cy.get('[data-testid="button-edit-menu"]').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.wait(4000);
    cy.url().should('include', 'http://localhost:3000/staff/menus');

    /* Staff menu delete */


    cy.get('[data-testid="menu-delete-1"]').click();
    cy.get('.MuiAlert-message').should('be.visible');

    /*  USERS */
    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('[data-testid="menu-staff-expand-collapse"]').click();
    cy.get('[data-testid="menu-staff-users"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/users');
    cy.wait(4000);

    cy.get('a[data-testid="button-user-details-0"]').click();


    /* ORDERS */

    cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium').click();
    cy.get('[data-testid="menu-staff-expand-collapse"]').click();
    cy.get('[data-testid="menu-staff-orders"]').click();
    cy.url().should('include', 'http://localhost:3000/staff/orders');

    /* Changing orders status */
    cy.wait(3000);

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