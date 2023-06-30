/// <reference types = "cypress" />


import '../support/commandsContas'

describe('Cadastrar um novo usuário na página Barriga React', () => {

    let token

    beforeEach(() => {
        cy.getToken('kayquedamasceno2@test.com', 'kayquetest')
            .then(tkn => {
                token = tkn
            }).then(token => {
                cy.resetApp(token)
            })
        
       
        
    })

    it('Inserindo nova conta', () => {
       
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'conta qualquer'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'conta qualquer')
        })

    })

    it('Alterando conta', () => {
      
    })

    it('Nao deve criar conta com mesmo nome', () => {
       
    })

    it('Cadastrar uma movimentacao', () => {

    })

    it('Checar saldo', () => {

       
    })

    it('Remover movimentação', () => {

        
    })


   
})