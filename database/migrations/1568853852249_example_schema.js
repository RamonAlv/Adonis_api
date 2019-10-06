'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExampleSchema extends Schema {
  up () {
    this.create('examples', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('examples')
  }
}

module.exports = ExampleSchema
