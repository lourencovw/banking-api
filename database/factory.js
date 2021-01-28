'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker, i , data = {}) => {
  return {
    email: faker.email(),
    cpf: faker.cpf(),
    password: '1234',
    ...data
  }
})
Factory.blueprint('App/Models/Store', async (faker, i , data = {}) => {
  return {
    document: faker.cnpj(),
    cpf: faker.cpf(),
    ...data
  }
})
