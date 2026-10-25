# ⚡ Testes de Performance de API com k6

![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge&logo=openapiinitiative&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> Exercício de teste de performance com **k6**, usando o **OpenAPI Generator** para extrair automaticamente todas as requisições e respostas da API e acelerar a criação dos testes.

---

## 📋 Sobre o projeto

A melhor forma de iniciar testes de performance de API é ter um panorama geral das requisições. Neste projeto, o **OpenAPI Generator** lê a especificação (Swagger) da aplicação e gera os scripts base em k6, com todos os endpoints, tipos de requisição e respostas. É um ótimo ponto de partida.

## 🧰 Requisitos

| Requisito | Link |
|---|---|
| Chocolatey (gerenciador de pacotes para Windows) | [Instalação](https://docs.chocolatey.org/en-us/choco/setup/) |
| k6 | [Instalação](https://grafana.com/docs/k6/latest/set-up/install-k6/) |
| Docker | Necessário para rodar o OpenAPI Generator |

## ▶️ Como executar

**1. Verificar as instalações**

```bash
choco --version
k6 version
```

**2. Executar o primeiro teste**

```bash
k6 run primeiro-test.js
```

**3. Definir parâmetros, se necessário** (exemplo: 10 usuários virtuais por 30 segundos)

```bash
k6 run --vus 10 --duration 30s primeiro-test.js
```

### ☁️ Enviando resultados para o k6 Cloud (opcional)

Faça login com o token e a stack da **sua** conta:

```bash
k6 cloud login --token <YOUR_K6_API_TOKEN> --stack <YOUR_STACK_URL_OR_SLUG>
```

> 🔒 **Nunca escreva seu token no README nem o envie ao repositório.** Se preferir, defina-o como variável de ambiente (`K6_CLOUD_TOKEN`) no seu computador.

## 🧬 Gerando os testes com OpenAPI Generator

Imagem Docker utilizada: [openapitools/openapi-generator-cli](https://hub.docker.com/r/openapitools/openapi-generator-cli)

**1. Obter a especificação da API**

Com a aplicação rodando, acesse `http://localhost:3000/swagger.json`. Esse endereço apresenta todas as requisições, respostas e componentes importantes para o OpenAPI Generator. Salve o conteúdo como `ebac-api-login.json` na raiz do projeto.

**2. Gerar os scripts k6**

```bash
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i /local/ebac-api-login.json -g k6 -o /local/k6-tests/ --skip-validate-spec
```

> 💡 `${PWD}` funciona no Linux, macOS e PowerShell. No CMD do Windows, troque por `%cd%`.

**3. Resultado**

Os scripts ficam na pasta `k6-tests/`, com todos os endpoints e todos os tipos de requisições e respostas da aplicação.

---

<p align="center">Feito por <a href="https://github.com/ccaiolsa">Caio Araújo</a> • <a href="https://www.linkedin.com/in/ccaiolsa-qa">LinkedIn</a></p>
