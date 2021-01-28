'use strict'

const { test, trait } = use('Test/Suite')('Register')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');


test('Email should be required', async ({ assert, client }) => {
  const user = {cpf: "37018581010", password: "123" }

  const response = await client.post('/register').send(user).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'required validation failed on email');

})

test('Email should be a valid email', async ({ assert, client }) => {
  const user = {email: 'testegmail.com',cpf: "37018581010", password: "123" }


  const response = await client.post('/register').send(user).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'email validation failed on email');
})

test('Email should be unique', async ({ assert, client }) => {
  const {$attributes} = await Factory.model('App/Models/User').create();

  const response = await client.post('/register').send($attributes).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'unique validation failed on email');
})

test('CPF should be required', async ({ assert, client }) => {
  const {$attributes} = await Factory.model('App/Models/User').make();
  const payload = {email: $attributes.email, password: $attributes.password}

  const response = await client.post('/register').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'required validation failed on cpf');
})

test('CPF should be a valid CPF', async ({ assert, client }) => {
  const {$attributes} = await Factory.model('App/Models/User').make({cpf: '939.617.610-93'});

  const response = await client.post('/register').send($attributes).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'cpf validation failed on cpf');
})

test('CPF should be unique', async ({ assert, client }) => {
  const {$attributes} = await Factory.model('App/Models/User').make();
  await Factory.model('App/Models/User').create({cpf: $attributes.cpf});

  const response = await client.post('/register').send($attributes).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'unique validation failed on cpf');
})

test('Password should be required', async ({ assert, client }) => {
  const {$attributes} = await Factory.model('App/Models/User').make();
  const payload = {email: $attributes.email, cpf: $attributes.cpf}

  const response = await client.post('/register').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'required validation failed on password');
})

test('Correct payload should register', async ({ assert, client }) => {
  const {$attributes} = await Factory.model('App/Models/User').make();

  const response = await client.post('/register').send($attributes).end();
  
  response.assertStatus(200);
  assert.hasAllKeys(response.body, ['email', 'password', 'cpf','created_at', 'updated_at','id'])
})


