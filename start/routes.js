'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'UserController.store').validator('User');
Route.post('/login', 'UserController.login').validator('Login');

Route.group(() => {
    Route.post('/stores', 'StoreController.store').validator('Store')
    Route.post('/transactions', 'TransactionController.store').validator('Transaction')
    Route.get('/transactions', 'TransactionController.index')
}).middleware(['auth'])
