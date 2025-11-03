# 🚀 Guia Rápido - Executar Testes Philosophy Coffee

## ⚡ Passo a Passo Rápido

### 1. Instalar Dependências
```bash
npm install
```

### 2. Instalar Navegador Chromium
```bash
npx playwright install chromium
```

### 3. Executar Testes
```bash
# Executar APENAS os testes do Philosophy Coffee
npx playwright test src/scenarios/PhilosophyCoffeeContact.spec.ts

# Executar com navegador visível (para ver a execução)
npx playwright test src/scenarios/PhilosophyCoffeeContact.spec.ts --headed

# Executar em modo debug (passo a passo)
npx playwright test src/scenarios/PhilosophyCoffeeContact.spec.ts --debug
```

### 4. Ver Relatório
```bash
npm run show-report
```

---

## 🎯 Os 3 Casos de Teste

### ✅ CT001 - Formulário Completo
Preenche todos os campos e valida envio com sucesso.

### ✅ CT002 - Validação de Campos Obrigatórios
Testa que Nome e Email são obrigatórios.

### ✅ CT003 - ZeroStep AI (Requer Token)
Usa IA para preencher o formulário.

**Para habilitar CT003:**
```bash
# Windows PowerShell
$env:ZEROSTEP_TOKEN="seu-token-aqui"

# Linux/Mac
export ZEROSTEP_TOKEN="seu-token-aqui"
```

---

## 📊 URL do Formulário

**URL Testada:** https://www.philosophycoffee.com/contact

**Campos do Formulário:**
- ✅ Name* (obrigatório)
- ✅ Email* (obrigatório)
- ⭕ Subject (opcional)
- ⭕ Message (opcional)

---

## 🔧 Troubleshooting

### Erro: "Executable doesn't exist"
```bash
npx playwright install chromium
```

### Erro: "Cannot find module"
```bash
npm install
```

### Testes falhando
1. Verifique sua conexão com a internet
2. O site pode estar fora do ar temporariamente
3. Execute em modo headed para visualizar o problema:
```bash
npx playwright test src/scenarios/PhilosophyCoffeeContact.spec.ts --headed
```

---

## 📂 Arquivos Importantes

```
src/scenarios/PhilosophyCoffeeContact.spec.ts   # 👈 Casos de teste
src/support/pages/PhilosophyCoffeeContactPage.ts   # Métodos de página
src/support/elements/PhilosophyCoffeeContactElements.ts   # Seletores
```

---

## 🎓 Comandos Úteis

```bash
# Executar todos os testes do projeto
npm test

# Executar com UI do Playwright
npm run ui

# Ver último relatório
npm run show-report

# Formatar código
npm run format

# Verificar formatação
npm run verify
```

---

## 📝 Estrutura do Teste

```typescript
test.describe('Philosophy Coffee - Formulário de Contato', () => {
  test.beforeEach(async ({ page }) => {
    // Navega para a página de contato
    await page.goto('https://www.philosophycoffee.com/contact');
  });

  test('CT001', async ({ page }) => {
    // Preenche formulário
    // Envia
    // Valida sucesso
  });

  test('CT002', async ({ page }) => {
    // Valida campos obrigatórios
  });

  test('CT003', async ({ page }) => {
    // Usa ZeroStep AI
  });
});
```

---

**🎯 Objetivo:** Validar o formulário de contato do Philosophy Coffee  
**🤖 Tecnologia:** Playwright + TypeScript + ZeroStep AI  
**📅 Data:** Novembro 2025

