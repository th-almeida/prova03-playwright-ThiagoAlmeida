import { Page, expect } from '@playwright/test';
import PhilosophyCoffeeContactElements from '../elements/PhilosophyCoffeeContactElements';
import BasePage from './BasePage';

export default class PhilosophyCoffeeContactPage extends BasePage {
  readonly contactElements: PhilosophyCoffeeContactElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.contactElements = new PhilosophyCoffeeContactElements(page);
  }

  async preencherFormularioCompleto(
    nome: string,
    email: string,
    assunto: string,
    mensagem: string
  ): Promise<void> {
    await this.contactElements.getNameField().fill(nome);
    await this.contactElements.getEmailField().fill(email);
    await this.contactElements.getSubjectField().fill(assunto);
    await this.contactElements.getMessageField().fill(mensagem);
  }

  async preencherFormularioObrigatorio(
    nome: string,
    email: string
  ): Promise<void> {
    await this.contactElements.getNameField().fill(nome);
    await this.contactElements.getEmailField().fill(email);
  }

  async clicarEnviar(): Promise<void> {
    await this.contactElements.getSendButton().click();
  }

  async validarMensagemSucesso(): Promise<void> {
    await expect(this.contactElements.getSuccessMessage()).toBeVisible({
      timeout: 10000
    });
  }

  async validarCampoObrigatorio(campo: 'name' | 'email'): Promise<void> {
    const locator =
      campo === 'name'
        ? this.contactElements.getNameField()
        : this.contactElements.getEmailField();

    const isInvalid = await locator.evaluate((element: HTMLInputElement) => {
      return (
        element.validity.valueMissing ||
        !element.checkValidity() ||
        element.getAttribute('aria-invalid') === 'true'
      );
    });

    expect(isInvalid).toBeTruthy();
  }
}
