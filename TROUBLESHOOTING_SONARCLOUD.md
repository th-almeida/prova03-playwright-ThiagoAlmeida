# 🔧 Troubleshooting SonarCloud - Erro 404

## ❌ Erro Identificado

```
Error 404 on https://api.sonarcloud.io/analysis/analyses
```

Este erro indica que o SonarCloud não consegue encontrar o projeto ou há problema na configuração.

---

## ✅ Soluções (Passo a Passo)

### Solução 1: Verificar se o Projeto Existe no SonarCloud

1. **Acesse:** https://sonarcloud.io/projects
2. **Verifique** se o projeto `prova03-playwright-ThiagoAlmeida` está listado
3. **Se NÃO existir:**
   - Clique em **"Analyze new project"**
   - Selecione **GitHub**
   - Escolha o repositório: `prova03-playwright-ThiagoAlmeida`
   - Confirme a criação

### Solução 2: Verificar Organização

1. **Acesse:** https://sonarcloud.io/account/organizations
2. **Verifique** se existe a organização: `ugioni`
3. **Se não existir:**
   - Você precisa ser adicionado à organização `ugioni`, OU
   - Criar sua própria organização e atualizar os arquivos

#### Para usar sua própria organização:

**Passo 1:** Criar organização no SonarCloud
- Acesse: https://sonarcloud.io/account/organizations
- Clique em **"+"** para criar nova organização
- Anote o **key** da organização (exemplo: `seu-nome`)

**Passo 2:** Atualizar `sonar-project.properties`

```properties
sonar.projectKey=seu-usuario_prova03-playwright-ThiagoAlmeida
sonar.organization=seu-nome-org
sonar.projectName=Playwright E2E
sonar.projectVersion=1.0
sonar.sources=./src
sonar.sourceEncoding=UTF-8
```

**Passo 3:** Atualizar `.github/workflows/node.js.yml`

Você NÃO precisa alterar nada no workflow, pois ele usa o `sonar-project.properties`.

### Solução 3: Criar/Atualizar SONAR_TOKEN

1. **Acesse:** https://sonarcloud.io/account/security
2. **Clique em:** "Generate Tokens"
3. **Preencha:**
   - Name: `playwright-github-actions`
   - Type: Global Analysis Token (ou User Token)
   - Expires: 90 days (ou No expiration)
4. **Clique em:** Generate
5. **Copie** o token gerado (ATENÇÃO: só aparece uma vez!)
6. **No GitHub:**
   - Vá em: Settings → Secrets and variables → Actions
   - **SE JÁ EXISTE** `SONAR_TOKEN`:
     - Clique nele → Update → Cole o novo token
   - **SE NÃO EXISTE**:
     - New repository secret
     - Name: `SONAR_TOKEN`
     - Secret: Cole o token
     - Add secret

### Solução 4: Importar Projeto Manualmente (RECOMENDADO)

**Passo 1:** Acesse https://sonarcloud.io/projects/create

**Passo 2:** Escolha **"Import from GitHub"**

**Passo 3:** Autorize o SonarCloud a acessar seu GitHub (se ainda não autorizou)

**Passo 4:** Selecione o repositório: `prova03-playwright-ThiagoAlmeida`

**Passo 5:** Configure:
- Organization: Escolha `ugioni` (se tiver acesso) ou crie/use sua organização
- Project key: Deve ser gerado automaticamente como `usuario_prova03-playwright-ThiagoAlmeida`

**Passo 6:** Click em **"Set Up"**

**Passo 7:** Escolha **"With GitHub Actions"**

**Passo 8:** O SonarCloud vai mostrar:
- O projectKey correto
- O organization correto
- O token (pode gerar um novo ou usar existente)

**Passo 9:** Anote esses valores e atualize seu `sonar-project.properties` se necessário

---

## 🔍 Verificar Configuração Atual

### Arquivo: `sonar-project.properties`

Seu arquivo atual:
```properties
sonar.projectKey=th-almeida_prova03-playwright-ThiagoAlmeida
sonar.organization=ugioni
```

**Verifique:**
- [ ] `th-almeida` é seu usuário do GitHub?
- [ ] Você tem acesso à organização `ugioni` no SonarCloud?
- [ ] O projeto existe no SonarCloud com esse projectKey exato?

### Testar Localmente (Opcional)

Se tiver o SonarCloud Scanner instalado:

```bash
# Windows PowerShell
$env:SONAR_TOKEN="seu-token-aqui"
sonar-scanner

# Linux/Mac
export SONAR_TOKEN="seu-token-aqui"
sonar-scanner
```

---

## 🎯 Solução Rápida Recomendada

Se você quer resolver rapidamente:

### 1. Criar Sua Própria Organização

1. Acesse: https://sonarcloud.io/
2. Login com GitHub
3. Crie uma organização pessoal (gratuita)
4. Anote o **key** da organização

### 2. Atualizar `sonar-project.properties`

```properties
sonar.projectKey=seu-github-username_prova03-playwright-ThiagoAlmeida
sonar.organization=sua-org-sonarcloud
sonar.projectName=Playwright E2E Philosophy Coffee
sonar.projectVersion=1.0
sonar.sources=./src
sonar.sourceEncoding=UTF-8
```

**Substitua:**
- `seu-github-username` → Seu usuário do GitHub
- `sua-org-sonarcloud` → Key da sua organização no SonarCloud

### 3. Gerar Token

1. https://sonarcloud.io/account/security
2. Generate token
3. Copiar token
4. Adicionar no GitHub Secrets como `SONAR_TOKEN`

### 4. Fazer Push e Testar

```bash
git add .
git commit -m "fix: atualizar configuração SonarCloud"
git push origin master
```

---

## 📞 Se o Erro Persistir

### Opção 1: Tornar SonarCloud Opcional

Adicione `continue-on-error: true` no step do SonarCloud:

```yaml
- name: SonarCloud Scan
  uses: SonarSource/sonarqube-scan-action@v6.0.0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
  continue-on-error: true  # ← Adicionar esta linha
```

Assim os testes continuam mesmo se o SonarCloud falhar.

### Opção 2: Desabilitar Temporariamente

Comente o job do SonarCloud no workflow:

```yaml
# sonarcloud:
#   name: Run SonarCloud
#   runs-on: ubuntu-latest
#   steps:
#     - uses: actions/checkout@v5.0.0
#       ...
```

---

## ✅ Checklist de Verificação

Antes de fazer novo push, verifique:

- [ ] Projeto existe no SonarCloud
- [ ] Organização está correta no `sonar-project.properties`
- [ ] ProjectKey está correto no `sonar-project.properties`
- [ ] SONAR_TOKEN está configurado no GitHub Secrets
- [ ] Token não está expirado
- [ ] Você tem permissão de "Execute Analysis" na organização

---

## 📚 Links Úteis

- **SonarCloud Projects:** https://sonarcloud.io/projects
- **Generate Token:** https://sonarcloud.io/account/security
- **Organizations:** https://sonarcloud.io/account/organizations
- **Documentação:** https://docs.sonarcloud.io/

---

**Dica:** O erro mais comum é tentar usar a organização `ugioni` sem ter acesso a ela. Crie sua própria organização no SonarCloud (é gratuito) e atualize o `sonar-project.properties`.

