import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('TipoProduto e2e test', () => {

    let navBarPage: NavBarPage;
    let tipoProdutoDialogPage: TipoProdutoDialogPage;
    let tipoProdutoComponentsPage: TipoProdutoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TipoProdutos', () => {
        navBarPage.goToEntity('tipo-produto');
        tipoProdutoComponentsPage = new TipoProdutoComponentsPage();
        expect(tipoProdutoComponentsPage.getTitle()).toMatch(/gestaoApp.tipoProduto.home.title/);

    });

    it('should load create TipoProduto dialog', () => {
        tipoProdutoComponentsPage.clickOnCreateButton();
        tipoProdutoDialogPage = new TipoProdutoDialogPage();
        expect(tipoProdutoDialogPage.getModalTitle()).toMatch(/gestaoApp.tipoProduto.home.createOrEditLabel/);
        tipoProdutoDialogPage.close();
    });

    it('should create and save TipoProdutos', () => {
        tipoProdutoComponentsPage.clickOnCreateButton();
        tipoProdutoDialogPage.setNomeInput('nome');
        expect(tipoProdutoDialogPage.getNomeInput()).toMatch('nome');
        tipoProdutoDialogPage.save();
        expect(tipoProdutoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TipoProdutoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tipo-produto div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TipoProdutoDialogPage {
    modalTitle = element(by.css('h4#myTipoProdutoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function (nome) {
        this.nomeInput.sendKeys(nome);
    }

    getNomeInput = function () {
        return this.nomeInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
