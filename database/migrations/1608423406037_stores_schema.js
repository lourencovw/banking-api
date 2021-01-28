'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoresSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments();
      table.string('document',18).notNullable().unique();
      table.string('cpf', 14).notNullable().unique().references('cpf').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      table.timestamps();
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoresSchema
