'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    const user = await Factory.model('App/Models/User').create();
    const store = await Factory.model('App/Models/Store').make();

    await user.stores().save(store)

    const user2 = await Factory.model('App/Models/User').create();
    const store2 = await Factory.model('App/Models/Store').make();

    await user2.stores().save(store2)
  }
}

module.exports = DatabaseSeeder
