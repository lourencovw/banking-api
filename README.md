# 1 - Instruções

- 1.1 Pré-requisitos
    - NodeJS
    - Adonis CLI `npm i -g @adonisjs/cli`

- 1.2 Instalar dependências
> `npm install`
    
- 1.3 Executar migrations (banco de dados SQLite, não necessita conexão) - 
> `adonis migration:run`
    
- 1.4 Iniciar servidor - 
> `adonis serve`
    
- 1.5 (OPCIONAL) Popular banco de dados para evitar cadastro de lojas e usuários - 
> `adonis seed`
    
- 1.6 (OPCIONAL) Executar testes - 
> `adonis test`
    

# 2 - Rotas e payloads

### 2.1 - POST /register
Registra o usuário na aplicação
###### BODY (json)
```json
{
    "email": "email@email.com",
    "cpf": "000.000.000-00",
    "password": "1234"
}
```
### 2.2 - POST /login
Loga o usuário na aplicação usando token JWT
###### BODY (json)
```json
{
    "email": "email@email.com",
    "password": "1234"
}
```
### 2.3 - POST /stores
Cria a loja para um usuário
##### Authorization - Bearer Token
```
 Bearer <token>
```
##### BODY (json)
```json
{
    "document": "000.000.000/0000-00" //CNPJ atrelado ao usuário
}
```
### 2.4 - POST /transactions
Envia dinheiro de uma loja para outra
##### Authorization - Bearer Token
```
 Bearer <token>
```
##### BODY (json)
```json
{
    "document":"000.000.000/0000-00", // CNPJ para o qual o dinheiro será enviado
    "amount" : "100.00"
}
```
### 2.5 - GET /transactions
Lista todas as transações
##### Authorization - Bearer Token
```
 Bearer <token>
```
