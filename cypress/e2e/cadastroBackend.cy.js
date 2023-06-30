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
            url: 'contas',
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

        
            
        let id
      
        cy.getId('Conta para alterar', token)
            .then(id => {
                cy.request({
                    method: 'PUT',
                    url: `contas/${id}`,
                    headers: {
                        Authorization: `JWT ${token}`
                    },
                    body: {
                        nome: 'conta alterada via rest'
                    }
                }).as('response')

                cy.get('@response').then(res => {
                    expect(res.status).to.be.equal(200)
                    expect(res.body).to.have.property('id', id)
                    expect(res.body).to.have.property('nome', 'conta alterada via rest')
                    expect(res.body).to.have.property('visivel')
                    expect(res.body).to.have.property('usuario_id')
                    
        
                    })
            })
      
    
       

        
    })

    it('Nao deve criar conta com mesmo nome', () => {

        
        cy.request({
            method: 'POST',
            url: 'contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
         
        })
       
    })

    it('Cadastrar uma movimentacao', () => {

        cy.getId('Conta para movimentacoes', token)
            .then(id => {
                cy.request({
                    method: 'POST',
                    url: 'transacoes',
                    headers: {
                        Authorization: `JWT ${token}`
                    },
                    body: {
                        conta_id: id,
                        data_pagamento: "30/06/2023",
                        data_transacao: "30/06/2023",
                        descricao: "testedescricao",
                        envolvido: "testeenvolvido",
                        status: true,
                        tipo: "REC",
                        valor:"500"
                    }
                }).then(res => {
                    expect(res.status).to.be.equal(201)
                
                })
            })
        

    })

    it('Checar saldo', () => {

        
        cy.request({
            method: 'GET',
            url: 'saldo',
            headers: {
                Authorization: `JWT ${token}`
            },
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo')
                    saldoConta = c.saldo
            });

            expect(saldoConta).to.be.equal('534.00')
        }) 
       
    })

    it('Remover movimentação', () => {

        cy.getIdTransacoes('Movimentacao para exclusao', token)
            .then(id => {
                cy.request({
                    method: 'DELETE',
                    url: `transacoes/${id}`,
                    headers: {
                        Authorization: `JWT ${token}`
                    }
                }).then(res => {
                    expect(res.status).to.be.equal(204)

                })
            })
    })


   
})