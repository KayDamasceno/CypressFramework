
import loc from './locators'

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://barrigareact.wcaquino.me')
    cy.title().should('be.equal', 'React App')
    
    cy.get(loc.LOGIN.USER).type(email)
    cy.get(loc.LOGIN.PASSWORD).type(password)
    cy.get(loc.LOGIN.BTN_ENTER).click()
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESETAR).click()
    cy.get(loc.MESSAGE.CLOSE_TOAST).click()
})