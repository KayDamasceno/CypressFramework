
import loc from './locators'

Cypress.Commands.add('menuDeContas', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta', (nomeConta) => {
    cy.get(loc.CONTAS.NOME)
        .clear()
        .type(nomeConta)
    cy.get(loc.CONTAS.SALVAR).click()
})

