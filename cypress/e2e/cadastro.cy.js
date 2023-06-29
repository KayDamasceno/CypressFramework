/// <reference types = "cypress" />

import loc from '../support/locators'

describe('Cadastrar um novo usuário na página Barriga React', () => {


    before(() => {
        cy.login('kayquedamasceno2@test.com', 'kayquetest')
        
    })

    it('Inserindo nova conta', () => {

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('Nova conta')
        cy.get(loc.CONTAS.SALVAR).click()
        cy.get(loc.MESSAGE.NOVA_CONTA).should('be.visible')


    })

    it('Alterando conta', () => {

        cy.get(loc.CONTAS.ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada')
        cy.get(loc.CONTAS.SALVAR).click()
    })
})