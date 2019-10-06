'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('code',50).notNullable().unique()
      table.string('name',150).notNullable()
      table.text('description').notNullable()
      table.string('image',150).notNullable()

      // table.increments()
      table.timestamps('created_at')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
