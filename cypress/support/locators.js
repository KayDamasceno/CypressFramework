const locators = {
    LOGIN : {
        USER: '[data-test= "email"]',
        PASSWORD: '[data-test = "passwd"]',
        BTN_ENTER: '[type = "submit"]'
    },
    MENU : {
        SETTINGS: '[title = "settings"]',
        CONTAS: '[href = "/contas"]',
        RESETAR: '[href = "/reset"]'

    },
    CONTAS : {
        NOME: '[placeholder = "Conta..."]',
        SALVAR: '[alt= "Salvar"]',
        ALTERAR: '[title*= "Alterar"]',
        

    },
    MESSAGE : {
        NOVA_CONTA : '.toast-success'
    } 
}

export default locators;