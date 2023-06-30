const locators = {
    LOGIN : {
        USER: '[data-test= "email"]',
        PASSWORD: '[data-test = "passwd"]',
        BTN_ENTER: '[type = "submit"]'
    },
    MENU : {
        SETTINGS: '[title = "settings"]',
        CONTAS: '[href = "/contas"]',
        RESETAR: '[href = "/reset"]',
        MOVIMENTAR: "[title*= 'Cadastrar']",
        HOME: '[data-test="menu-home"]',
        EXTRATO: '[data-test="menu-extrato"]'

    },
    CONTAS : {
        NOME: '[placeholder = "Conta..."]',
        SALVAR: '[alt= "Salvar"]',
        ALTERAR: '[title*= "Alterar"]',
        

    },
    MOVIMENTACAO : {
        DESCRICAO : '[data-test = "descricao"]',
        VALOR : '[data-test = "valor"]',
        ENVOLVIDO : '[data-test = "envolvido"]',
        SALVAR: '[alt= "Salvar"]',
        STATUS: '[data-test = "status"]',
        CONTA : '[data-test="conta"]'

    },
    MESSAGE : {
        TOAST_SUC : '.toast-success',
        TOAST_ERR : '.toast-error',
        CLOSE_TOAST: '.toast-close-button'
    } 
}

export default locators;