'use strict'

const { test, before, trait } = use('Test/Suite')('Transaction')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Store = use('App/Models/Store')
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client')

test('Document should be required', async ({ assert, client }) => {
  const user1 = await User.find(1);
  const store2 = await Store.find(2);
  const payload = {
    "amount": 100.00
  }

  const response = await client.post('/transactions').loginVia(user1, 'jwt').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'required validation failed on document');

})

test('Document should be a valid cnpj', async ({ assert, client }) => {
  const user1 = await User.find(1);
  const payload = {
    "document": '88.148.464/0001-92',
    "amount": 100.00
  }

  const response = await client.post('/transactions').loginVia(user1, 'jwt').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'cnpj validation failed on document');
})

test('Document should exist in database', async ({ assert, client }) => {
  const user1 = await User.find(1);
  const payload = {
    "document": '88.148.464/0001-90',
    "amount": 100.00
  }

  const response = await client.post('/transactions').loginVia(user1, 'jwt').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'exists validation failed on document');
})

test('Amount should be required', async ({ assert, client }) => {
  const user1 = await User.find(1);
  const store2 = await Store.find(2);
  const payload = {
    "document": store2.toJSON()['document']
  }

  const response = await client.post('/transactions').loginVia(user1, 'jwt').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'required validation failed on amount');
})

test('Correct payload should work', async ({ assert, client }) => {
  const user1 = await User.find(1);
  const store2 = await Store.find(2);
  const payload = {
    "document": store2.toJSON()['document'],
    "amount": 100.00
  }

  const response = await client.post('/transactions').loginVia(user1, 'jwt').send(payload).end();
  
  response.assertStatus(200);
  assert.hasAllKeys(response.body, [ 'from_cnpj','to_cnpj','amount', 'created_at','updated_at', 'id'])
})
