/// <reference types = "cypress" />

import loc from '../support/locators'
import '../support/commandsContas'

describe('Cadastrar um novo usuário na página Barriga React', () => {


    beforeEach(() => {
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
        cy.contains('Conta para alterar').siblings('td').children('a').eq(0).click()
        cy.inserirConta('Conta alterada')

        cy.get(loc.MESSAGE.TOAST_SUC).should('contain', 'Conta atualizada')
        //cy.get(loc.MESSAGE.CLOSE_TOAST).click()

        
    })

    it('Nao deve criar conta com mesmo nome', () => {
        cy.menuDeContas()
        cy.inserirConta('Conta mesmo nome')

        cy.get(loc.MESSAGE.TOAST_ERR).should('be.visible')
    })

    it('Cadastrar uma movimentacao', () => {

        cy.get(loc.MENU.MOVIMENTAR).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type("Descricao teste")
        cy.get(loc.MOVIMENTACAO.VALOR).type('500')
        cy.get(loc.MOVIMENTACAO.ENVOLVIDO).type('Envolvido teste')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.SALVAR).click()
        cy.get(loc.MESSAGE.TOAST_SUC).should('contain', 'sucesso')
    })

    it('Checar saldo', () => {

        cy.get(loc.MENU.HOME).click()
        cy.contains('Conta para saldo').siblings().should('contain', '534')
    })

    it('Remover movimentação', () => {

        cy.get(loc.MENU.EXTRATO).click()
        cy.contains('Movimentacao para extrato').parent().parent().siblings().children().eq(1).click()
        cy.get(loc.MESSAGE.TOAST_SUC).should('contain', 'sucesso')
    })


   
})