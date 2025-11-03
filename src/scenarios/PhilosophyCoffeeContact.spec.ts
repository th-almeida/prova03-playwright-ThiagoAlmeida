import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import { faker } from '@faker-js/faker';
import PhilosophyCoffeeContactPage from '../support/pages/PhilosophyCoffeeContactPage';

test.describe('Philosophy Coffee - Formulário de Contato', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let contactPage: PhilosophyCoffeeContactPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.philosophyCoffee')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    contactPage = new PhilosophyCoffeeContactPage(page);
    await page.goto(BASE_URL);
    // Aguarda o carregamento completo da página
    await page.waitForLoadState('networkidle');
  });

  test('CT001 - Enviar mensagem de contato com todos os campos preenchidos', async ({
    page
  }) => {
    // Gera dados aleatórios usando Faker
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const assunto = 'Informações sobre produtos';
    const mensagem = faker.lorem.paragraph();

    // Preenche o formulário completo
    await contactPage.preencherFormularioCompleto(
      nome,
      email,
      assunto,
      mensagem
    );

    // Envia o formulário
    await contactPage.clicarEnviar();

    // Valida a mensagem de sucesso
    await contactPage.validarMensagemSucesso();
  });

  test('CT002 - Validar campos obrigatórios do formulário', async ({
    page
  }) => {
    // Tenta enviar o formulário sem preencher os campos obrigatórios
    await contactPage.clicarEnviar();

    // Valida que os campos obrigatórios estão marcados como inválidos
    await contactPage.validarCampoObrigatorio('name');
    await contactPage.validarCampoObrigatorio('email');

    // Preenche apenas o nome (faltando o email)
    const nome = faker.person.fullName();
    await contactPage.contactElements.getNameField().fill(nome);
    await contactPage.clicarEnviar();

    // Valida que o campo de email ainda está inválido
    await contactPage.validarCampoObrigatorio('email');
  });

  test('CT003 - Enviar mensagem usando ZeroStep AI', async ({ page }) => {
    // Verifica se o token do ZeroStep está configurado
    if (!process.env.ZEROSTEP_TOKEN) {
      test.skip();
    }

    // Gera dados aleatórios
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const mensagem = 'Gostaria de saber mais sobre os blends de café especiais';

    // Usa ZeroStep AI para interagir com o formulário de forma natural
    await ai(
      `Preencha o formulário de contato com as seguintes informações:
       Nome: ${nome}
       Email: ${email}
       Mensagem: ${mensagem}
       Depois clique no botão de enviar`,
      { page, test }
    );

    // Aguarda e valida a mensagem de sucesso
    await page.waitForTimeout(3000);
    await contactPage.validarMensagemSucesso();
  });
});
