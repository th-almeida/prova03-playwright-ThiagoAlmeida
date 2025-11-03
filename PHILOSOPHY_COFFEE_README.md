# Testes Automatizados - Philosophy Coffee

Este projeto contém testes automatizados end-to-end (E2E) para o formulário de contato do site [Philosophy Coffee](https://www.philosophycoffee.com/contact) usando Playwright.

## 📋 Casos de Teste Implementados

### CT001 - Enviar mensagem de contato com todos os campos preenchidos
- **Objetivo**: Validar o envio bem-sucedido do formulário de contato com todos os campos preenchidos
- **Dados**: Gerados dinamicamente usando Faker.js
- **Campos**: Nome, Email, Assunto, Mensagem
- **Resultado Esperado**: Mensagem "Success! Message received." exibida

### CT002 - Validar campos obrigatórios do formulário
- **Objetivo**: Validar que os campos obrigatórios (Nome e Email) são validados corretamente
- **Cenários**:
  - Tentativa de envio sem preencher nenhum campo
  - Tentativa de envio preenchendo apenas o nome (sem email)
- **Resultado Esperado**: Validação HTML5 impede o envio e marca os campos como inválidos

### CT003 - Enviar mensagem usando ZeroStep AI
- **Objetivo**: Demonstrar o uso de IA para automação de testes
- **Tecnologia**: ZeroStep AI - interage com a página de forma natural usando linguagem humana
- **Requisito**: Variável de ambiente `ZEROSTEP_TOKEN` configurada
- **Resultado Esperado**: Formulário preenchido e enviado com sucesso usando comandos em linguagem natural

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão **Page Object Model (POM)** com a seguinte estrutura:

```
src/
├── scenarios/
│   └── PhilosophyCoffeeContact.spec.ts    # Casos de teste
├── support/
    ├── elements/
    │   └── PhilosophyCoffeeContactElements.ts    # Seletores dos elementos
    └── pages/
        └── PhilosophyCoffeeContactPage.ts        # Métodos de interação
```

### Elementos do Formulário

```typescript
- getNameField()      // input[name="name-*"]
- getEmailField()     // input[type="email"][name="email"]
- getSubjectField()   // input[name="subject"]
- getMessageField()   // textarea[placeholder="Message"]
- getSendButton()     // button[aria-label="Send"]
- getSuccessMessage() // text=Success! Message received.
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Instalar navegadores do Playwright
npx playwright install chromium
```

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar apenas os testes do Philosophy Coffee
npx playwright test src/scenarios/PhilosophyCoffeeContact.spec.ts

# Executar em modo debug
npm run debug

# Executar com interface UI
npm run ui

# Ver relatório dos testes
npm run show-report
```

### Configurar ZeroStep AI (Opcional)

Para executar o CT003, configure a variável de ambiente:

```bash
# Windows (PowerShell)
$env:ZEROSTEP_TOKEN="seu-token-aqui"

# Linux/Mac
export ZEROSTEP_TOKEN="seu-token-aqui"
```

Para obter um token, acesse: https://zerostep.com

## 🔄 CI/CD Pipeline

O projeto está configurado com GitHub Actions e integração com SonarCloud.

### Workflow
- **Trigger**: Push ou Pull Request nas branches main/master/develop
- **Steps**:
  1. Checkout do código
  2. Setup do Node.js 20
  3. Instalação de dependências
  4. Instalação dos navegadores do Playwright
  5. Verificação de formatação (Prettier)
  6. Execução dos testes
  7. Upload dos artefatos (relatórios e vídeos)
  8. Análise de código no SonarCloud
  9. Verificação do Quality Gate

### Secrets Necessários no GitHub

Configure os seguintes secrets no repositório:

- `SONAR_TOKEN`: Token de acesso ao SonarCloud
- `ZEROSTEP_TOKEN`: Token do ZeroStep AI (opcional)
- `GITHUB_TOKEN`: Gerado automaticamente pelo GitHub Actions

### Configuração do SonarCloud

O arquivo `sonar-project.properties` já está configurado com:

```properties
sonar.projectKey=th-almeida_prova03-playwright-ThiagoAlmeida
sonar.organization=ugioni
sonar.projectName=Playwright E2E
sonar.sources=./src
```

## 📊 Tecnologias Utilizadas

- **Playwright** 1.56.1 - Framework de testes E2E
- **TypeScript** 5.9.3 - Linguagem de programação
- **Faker.js** 9.9.0 - Geração de dados de teste
- **ZeroStep AI** 0.1.5 - Automação com IA
- **Prettier** 3.6.2 - Formatação de código
- **SonarCloud** - Análise de qualidade de código
- **GitHub Actions** - CI/CD

## 📝 Boas Práticas Implementadas

✅ **Page Object Model**: Separação de responsabilidades entre elementos, páginas e testes  
✅ **Dados Dinâmicos**: Uso de Faker.js para gerar dados de teste realistas  
✅ **Esperas Explícitas**: Uso de `waitForLoadState('networkidle')` e timeouts configuráveis  
✅ **Reutilização**: Métodos reutilizáveis nas páginas  
✅ **Legibilidade**: Código limpo e bem documentado  
✅ **CI/CD**: Pipeline automatizado com análise de qualidade  
✅ **IA nos Testes**: Demonstração de tecnologia emergente com ZeroStep AI  

## 🎯 Conformidade com Playwright

O projeto segue as melhores práticas do Playwright:

- ✅ Uso de locators modernos (sem XPath desnecessários)
- ✅ Auto-waiting implícito em todas as interações
- ✅ Configuração de timeouts apropriados
- ✅ Captura de screenshots e traces
- ✅ Execução paralela de testes
- ✅ Geração de relatórios HTML
- ✅ Uso do TypeScript com tipos adequados

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido como parte da Prova 03 - Playwright**  
**Data**: Novembro 2025

