Teste de performance utilizando K6

Requisitos básicos para utilizar o k6
- Instalar o gerneciador de pacotes Chocolately
    https://docs.chocolatey.org/en-us/choco/setup/

- Instalar o próprio k6
    https://grafana.com/docs/k6/latest/set-up/install-k6/

Como executar?
- Verificar se o chocolately foi instalado: choco -?
- verificar se o k6 foi instalado k6 -v
- Executar o primeiro teste: k6 run primeiro-test.js
- Pode-se executar definindo alguns parâmetros caso necessário: k6 run --vus 10 --duration 30s primeiro-test.js
- Realizar login para testes no cloud: k6 cloud login 
- token:00e57fef04518ad9c7bb7ce98ac21f23c50487d92c623d3252f07152d91485eb
- stack: https://epicmonorail1865.grafana.net

Testes de performance com k6
- A melhor forma de iniciar é tendo um panorama geral das requisições de API
- Para isso, foi preciso ter uma conta no OpenAPI para ter acesso a integração k6 com OpenAPI
- Link da image do OpenAPIGenerator: https://hub.docker.com/r/openapitools/openapi-generator-cli
- Para o projeto foi acessado o seguinte link: http://localhost:3000/swagger.json#
    - Aqui ele apresenta todas as requisições, resposta e componentes importantes para o openapitool
    - Execute o seguinte comando:
        docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i /local/ebac-api-login.json -g k6 -o /local/k6-tests/ --skip-validate-spec
- Ao final você terá todos os endpoints, todos os tipos de requisições e respostas. ISSO AJUDA MUITO quando você precisa fazer testes de API (ótimo Startpoint)