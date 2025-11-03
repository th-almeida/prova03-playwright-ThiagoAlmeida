# ✅ Checklist de Configuração - Philosophy Coffee Tests

## 📋 Configuração Local (Antes de Executar)

### 1. Instalação Inicial
- [ ] Node.js 20+ instalado
- [ ] Git instalado
- [ ] Clone do repositório feito
- [ ] Abrir terminal na pasta do projeto

### 2. Instalar Dependências
```bash
npm install
```
- [ ] Comando executado com sucesso
- [ ] Arquivo `node_modules/` criado

### 3. Instalar Navegadores Playwright
```bash
npx playwright install chromium
```
- [ ] Chromium baixado com sucesso
- [ ] Sem erros no terminal

### 4. Testar Execução Local
```bash
npx playwright test src/scenarios/PhilosophyCoffeeContact.spec.ts
```
- [ ] CT001 executou (passou ou falhou)
- [ ] CT002 executou (passou ou falhou)
- [ ] CT003 foi pulado (se não tiver token ZeroStep)

---

## 🔑 Configuração GitHub Secrets

### 1. SONAR_TOKEN (Obrigatório para Pipeline)

**Passos:**
1. [ ] Acessar https://sonarcloud.io/
2. [ ] Fazer login ou criar conta
3. [ ] Ir em **My Account** → **Security**
4. [ ] Gerar novo token com nome: `playwright-tests`
5. [ ] Copiar o token gerado
6. [ ] Ir no repositório GitHub → **Settings** → **Secrets and variables** → **Actions**
7. [ ] Clicar em **New repository secret**
8. [ ] Name: `SONAR_TOKEN`
9. [ ] Value: Colar o token copiado
10. [ ] Salvar

**Verificar:**
- [ ] Token aparece na lista de secrets (valor oculto)
- [ ] Nome está exatamente: `SONAR_TOKEN`

### 2. ZEROSTEP_TOKEN (Opcional - Para CT003)

**Passos:**
1. [ ] Acessar https://zerostep.com/
2. [ ] Criar conta gratuita
3. [ ] Ir em **Dashboard** ou **API Keys**
4. [ ] Gerar novo token
5. [ ] Copiar o token
6. [ ] No GitHub: **Settings** → **Secrets and variables** → **Actions**
7. [ ] **New repository secret**
8. [ ] Name: `ZEROSTEP_TOKEN`
9. [ ] Value: Colar o token
10. [ ] Salvar

**Verificar:**
- [ ] Token aparece na lista de secrets
- [ ] Nome está exatamente: `ZEROSTEP_TOKEN`

**Nota:** ⚠️ Se não configurar, o CT003 será automaticamente pulado.

### 3. GITHUB_TOKEN (Automático)

- [ ] Não precisa configurar (GitHub gera automaticamente)

---

## 🔗 Configuração SonarCloud

### 1. Criar Projeto no SonarCloud

**Passos:**
1. [ ] Acessar https://sonarcloud.io/projects/create
2. [ ] Escolher **GitHub**
3. [ ] Autorizar acesso ao repositório
4. [ ] Selecionar: `prova03-playwright-ThiagoAlmeida`
5. [ ] Seguir wizard de configuração
6. [ ] Selecionar organização: `ugioni`
7. [ ] Project key deve ser: `th-almeida_prova03-playwright-ThiagoAlmeida`

**Verificar:**
- [ ] Projeto criado no SonarCloud
- [ ] Organization: `ugioni`
- [ ] Project Key: `th-almeida_prova03-playwright-ThiagoAlmeida`

### 2. Configuração Automática

O arquivo `sonar-project.properties` já está configurado:
```properties
sonar.projectKey=th-almeida_prova03-playwright-ThiagoAlmeida
sonar.organization=ugioni
sonar.sources=./src
```

- [ ] Arquivo existe no repositório
- [ ] Valores conferidos

---

## 🚀 Configuração Pipeline GitHub Actions

### 1. Verificar Arquivo Workflow

- [ ] Arquivo existe: `.github/workflows/node.js.yml`
- [ ] Conteúdo foi atualizado com novo workflow

### 2. Fazer Push e Testar

```bash
git add .
git commit -m "feat: adicionar testes Philosophy Coffee com ZeroStep AI"
git push origin master
```

**Verificar:**
- [ ] Push realizado com sucesso
- [ ] Ir em **Actions** no GitHub
- [ ] Ver workflow executando
- [ ] Aguardar conclusão (pode levar 5-10 minutos)

### 3. Verificar Execução do Pipeline

**Acessar:** https://github.com/th-almeida/prova03-playwright-ThiagoAlmeida/actions

**Verificar cada step:**
- [ ] ✅ Checkout repository
- [ ] ✅ Setup Node.js
- [ ] ✅ Install dependencies
- [ ] ✅ Install Playwright Browsers
- [ ] ✅ Run Prettier verification
- [ ] ✅ Run Playwright tests
- [ ] ✅ Upload Playwright Report
- [ ] ✅ SonarCloud Scan
- [ ] ✅ Check SonarCloud Quality Gate

**Se algum step falhar:**
1. [ ] Clicar no step com erro
2. [ ] Ler o log de erro
3. [ ] Corrigir o problema
4. [ ] Fazer novo push

---

## 📊 Verificar Resultados

### 1. Relatório Playwright (no GitHub)

**Acessar:**
1. [ ] GitHub Actions → Última execução
2. [ ] Seção **Artifacts**
3. [ ] Download: `playwright-report`
4. [ ] Descompactar e abrir `index.html`

**Verificar:**
- [ ] CT001 aparece no relatório
- [ ] CT002 aparece no relatório
- [ ] CT003 aparece no relatório
- [ ] Screenshots disponíveis (se houver falhas)

### 2. Relatório SonarCloud

**Acessar:**
1. [ ] https://sonarcloud.io/
2. [ ] Ir em **My Projects**
3. [ ] Abrir: `prova03-playwright-ThiagoAlmeida`

**Verificar:**
- [ ] Quality Gate: Passed ✅
- [ ] Code Coverage exibido
- [ ] Bugs: 0
- [ ] Code Smells aceitável
- [ ] Vulnerabilities: 0

---

## 🎯 Checklist Final de Validação

### Testes Locais
- [ ] CT001 passa localmente
- [ ] CT002 passa localmente
- [ ] CT003 executa (passa ou skip)
- [ ] Relatório HTML gerado

### Pipeline GitHub Actions
- [ ] Workflow executa sem erros
- [ ] Todos os steps passam
- [ ] Artefatos são gerados
- [ ] SonarCloud scan completa

### Requisitos da Prova
- [ ] ✅ 3 casos de teste implementados
- [ ] ✅ Pipeline com GitHub Actions
- [ ] ✅ Integração com SonarCloud
- [ ] ✅ ZeroStep AI usado em 1 teste
- [ ] ✅ Uso correto do Playwright
- [ ] ✅ Page Object Model implementado

### Documentação
- [ ] README com instruções
- [ ] Código comentado onde necessário
- [ ] Commits com mensagens descritivas

---

## ⚠️ Problemas Comuns

### "Executable doesn't exist"
**Solução:**
```bash
npx playwright install chromium
```

### "SONAR_TOKEN not found"
**Solução:**
- Verificar se secret foi criado corretamente no GitHub
- Nome deve ser exatamente: `SONAR_TOKEN` (case-sensitive)

### Testes falhando no CI mas passando localmente
**Possíveis causas:**
- Site fora do ar
- Timeout muito curto
- Problemas de rede no GitHub Actions
**Solução:** Reexecutar o workflow

### SonarCloud Quality Gate falhando
**Solução:**
- `continue-on-error: true` está configurado
- Pipeline não vai falhar por causa disso
- Revisar código se necessário

---

## 📞 Suporte

Se tiver problemas:
1. [ ] Verificar logs do GitHub Actions
2. [ ] Executar localmente em modo debug
3. [ ] Verificar se todos os secrets estão configurados
4. [ ] Consultar documentação:
   - Playwright: https://playwright.dev/
   - ZeroStep: https://zerostep.com/docs
   - SonarCloud: https://docs.sonarcloud.io/

---

**✨ Quando tudo estiver ✅, o projeto está pronto para avaliação!**

---

**Última atualização:** Novembro 2025

