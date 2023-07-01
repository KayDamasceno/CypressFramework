/// <reference types = "cypress" />

import loc from '../support/locators'
import '../support/commandsContas'

describe('Cadastrar um novo usuário na página Barriga React', () => {


    beforeEach(() => {
        
        cy.intercept('POST', 'signin', {
            statusCode: 200,
            body: {
                id: 1000,
                nome: "fake kayque",
                toke: "qualquertoken"
            }
        })
    
        cy.intercept('GET', 'saldo', {
            statusCode: 200,
            body: [{
                conta_id: 9999,
                conta: 'conta mockada',
                saldo: '100000'
            }]
        })
        cy.login('kayquedamasceno2@test.com', 'kayquefake')
        //cy.resetApp()
        
    })

    it('Inserindo nova conta', () => {

        let interceptCount = 0

        cy.intercept('POST', 'contas', {
            statusCode: 201,
            body: {
                id:1799309,
                nome:"Nova conta",
                visivel:true,
                usuario_id :39480
            }
        }).as('SalvandoConta')

        cy.intercept('GET', 'contas', (req) => {
            req.reply(res => {
                if(interceptCount == 0){
                    interceptCount+=1;
                    res.send({
                        statusCode: 200,
                        body: [{
                            id:1799309,
                            nome:"Conta mockada 1",
                            visivel:true,
                            usuario_id :39480
                        },
                        {
                            id:1799308,
                            nome:"Conta mockada 2",
                            visivel:true,
                            usuario_id :39482
                        }]
                    })
                }else {
                    res.send({
                        statusCode: 200,
                        body: [{
                            id:1799309,
                            nome:"Conta mockada 1",
                            visivel:true,
                            usuario_id :39480
                        },
                        {
                            id:1799308,
                            nome:"Conta mockada 2",
                            visivel:true,
                            usuario_id :39482
                        },
                        {
                            id:1799309,
                            nome:"Nova conta",
                            visivel:true,
                            usuario_id :39483
                        }]
                    })
                }
            })
           
        })

        cy.menuDeContas()  
        cy.inserirConta('Nova conta')
        cy.get(loc.MESSAGE.TOAST_SUC).should('contain', 'Conta inserida')


    })

    it.only('Alterando conta', () => {
        let interceptCount = 0

        cy.intercept('PUT', 'contas/1799308', {
            statusCode: 200,
            body: {
                id:1799309,
                nome:"Conta alterada",
                visivel:true,
                usuario_id :39480
            }
        })

        

        cy.intercept('GET', 'contas', (req) => {
            req.reply(res => {
                if(interceptCount == 0){
                    interceptCount+=1;
                    res.send({
                        statusCode: 200,
                        body: [{
                            id:1799309,
                            nome:"Conta mockada 1",
                            visivel:true,
                            usuario_id :39480
                        },
                        {
                            id:1799308,
                            nome:"Conta mockada 2",
                            visivel:true,
                            usuario_id :39482
                        }]
                    })
                }else {
                    res.send({
                        statusCode: 200,
                        body: [{
                            id:1799309,
                            nome:"Conta mockada 1",
                            visivel:true,
                            usuario_id :39480
                        },
                        {
                            id:1799308,
                            nome:"Conta alterada",
                            visivel:true,
                            usuario_id :39482
                        },
                        ]
                    })
                }
            })
           
        })

        cy.menuDeContas()
        cy.contains('Conta mockada 2').siblings('td').children('a').eq(0).click()
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