# Projeto Avaliação
- Este projeto consome a API que permite o agendamento de transferências financeiras.

## Tecnologias e ferramentas utilizadas

- Vue 3.2
- Node v18.19.1
- Bootstrap
- HTML
- CSS

## Intruções para executar o build

### MacOS
- Se ainda não tiver o Node instalado, instale-o usando Homebrew:
  - brew install node
    <br>
    <br>
- Verifique se tudo foi instalado com o seguinte comando:
  - node -v
    <br>
  - npm -v
    <br>
    <br>
- Para rodar o projeto em modo desenvolvimento:
  - npm run serve
    <br>
    Acesse a aplicação em http://localhost:3000
    <br>
    <br>
- Para buildar o projeto para produção:
  - npm run build
    <br>
    <br>
- Após isso execute os comandos:
  - npm install -g serve
  - serve -s dist
    <br>
    Acesse a aplicação em http://localhost:3000

### Windows
- Se ainda não tiver o Maven instalado, faça o download  em: https://maven.apache.org/download.cgi e siga as instruções de instalação.
    <br>
    <br>
- Adicione o diretório bin do Maven ao PATH nas variáveis de ambiente do Windows.
  <br>
  <br>
- Abra o diretório do projeto onde o arquivo pom.xml está localizado e execute:
  - mvn clean install
    <br>
    <br>
- Execute o seguinte comando para rodar o projeto e mantê-lo em segundo plano:
  - start java -jar target/demo-0.0.1-SNAPSHOT.jar


## Resumo

- Após buildar o projeto, a documentação dos endpoints pode ser acessada no seguinte endereço: http://localhost:8080/swagger-ui/index.html#/
  <br>
  <br>
- A aplicação cria e armazenas as informações no banco de dados incorporado H2.
  <br>
  <br>
- Foram criados endpoints para fazer o CRUD completo de agendamentos de transferências financeiras.



