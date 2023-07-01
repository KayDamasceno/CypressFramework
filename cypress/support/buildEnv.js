const buildEnv = () => {
        
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
}

export default buildEnv