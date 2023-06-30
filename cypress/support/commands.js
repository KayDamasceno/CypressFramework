
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

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            email: user,
            senha: password,
            redirecionar: false
        }
    }).its('body.token').should('not.be.empty')
    .then(token =>{
        return token
    })
})

Cypress.Commands.add('resetApp', (token) => {
    cy.request({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/reset',
        headers: {
            Authorization: `JWT ${token}`
        }
    }).its('status').should('be.equal', 200)
})