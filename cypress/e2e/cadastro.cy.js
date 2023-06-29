/// <reference types = "cypress" />

import loc from '../support/locators'
import '../support/commandsContas'

describe('Cadastrar um novo usuário na página Barriga React', () => {


    before(() => {
        cy.login('kayquedamasceno2@test.com', 'kayquetest')
        cy.resetApp()
        
    })

    it('Inserindo nova conta', () => {

        cy.menuDeContas()
        cy.inserirConta('Nova conta')
        cy.get(loc.MESSAGE.TOAST_SUC).should('contain', 'Conta inserida')


    })

    it('Alterando conta', () => {
        cy.menuDeContas()
        cy.contains('Nova conta').siblings('td').children('a').eq(0).click()
        cy.inserirConta('Conta alterada')

        cy.get(loc.MESSAGE.TOAST_SUC).should('contain', 'Conta atualizada')
        //cy.get(loc.MESSAGE.CLOSE_TOAST).click()

        
    })

    it('Nao deve criar conta com mesmo nome', () => {
        cy.menuDeContas()
        cy.inserirConta('Conta alterada')

        cy.get(loc.MESSAGE.TOAST_ERR).should('be.visible')
    })

    after(() => {
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
        cy.clearAllLocalStorage()           
    })
})