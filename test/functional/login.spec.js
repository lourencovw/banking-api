'use strict'

const { test, trait } = use('Test/Suite')('Login')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');

test('Correct email and login should return JWT token', async ({ assert, client }) => {
  const { $attributes } = await Factory.model('App/Models/User').create({password: '1234'});
  const payload = {email :$attributes.email, password: '1234'}

  const response = await client.post('/login').send(payload).end();
  
  response.assertStatus(200);
  assert.hasAllKeys(response.body, ['refreshToken', 'token', 'type'])
})

test('Email should be required', async ({ assert, client }) => {
  const { $attributes } = await Factory.model('App/Models/User').make();
  const payload = {password: '1234'}

  const response = await client.post('/login').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'required validation failed on email');
})

test('Email should be a valid email', async ({ assert, client }) => {
  const { $attributes } = await Factory.model('App/Models/User').make({email: 'testegmail.com'});
  const payload = {email: $attributes.email, password: $attributes.email}

  const response = await client.post('/login').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'email validation failed on email');
})

test('Password should be required', async ({ assert, client }) => {
  const {$attributes} = await Factory.model('App/Models/User').make();
  const payload = {email: $attributes.email}

  const response = await client.post('/login').send(payload).end();
  const {error} = response.body;
  
  response.assertStatus(400);
  assert.equal(error[0].message, 'required validation failed on password');
})
