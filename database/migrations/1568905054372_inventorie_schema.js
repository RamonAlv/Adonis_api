'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorieSchema extends Schema {
  up () {
    this.create('inventories', (table) => {
      table.increments()
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('quantity').unsigned()
      table.float('price').unsigned()
      table.float('tax').unsigned()


      table.timestamps('created_at')
    })
  }

  down () {
    this.drop('inventories')
  }
}

module.exports = InventorieSchema
