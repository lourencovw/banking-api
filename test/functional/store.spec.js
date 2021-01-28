'use strict'

const { test, beforeEach, trait } = use('Test/Suite')('Store')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client')

beforeEach(async () => {
  await Factory.model('App/Models/User').create();
})


test('Document should be unique', async ({ assert, client }) => {
  const user = await User.find(3);

  await client.post('/stores').loginVia(user, 'jwt').send({document: '35.550.240/0001-44'}).end();
  const response = await client.post('/stores').loginVia(user, 'jwt').send({document: '35.550.240/0001-44'}).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'unique validation failed on document');
})

test('Document should be a valid CNPJ', async ({ assert, client }) => {
  const user = await User.find(2)

  const response = await client.post('/stores').loginVia(user, 'jwt').send({document: '35.550.240/0001-42'}).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'cnpj validation failed on document');
})

test('Document should have 18 characters', async ({ assert, client }) => {
  const user = await User.find(3)

  const response = await client.post('/stores').loginVia(user, 'jwt').send({document: '35.550.2400001-44'}).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'min validation failed on document');
})


test('Document should be required', async ({ assert, client }) => {
  const user = await User.find(4)

  const response = await client.post('/stores').loginVia(user, 'jwt').send({}).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'required validation failed on document');
})

test('Correct payload should work', async ({ assert, client }) => {
  const user = await User.find(5);

  const response = await client.post('/stores').loginVia(user, 'jwt').send({document: '95.347.118/0001-05'}).end();
  
  response.assertStatus(200);
  assert.hasAllKeys(response.body, [ 'cpf','document','created_at', 'updated_at','id'])
})