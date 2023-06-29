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
        TOAST_SUC : '.toast-success',
        TOAST_ERR : '.toast-error',
        CLOSE_TOAST: '.toast-close-button'
    } 
}

export default locators;