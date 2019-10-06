'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()

      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('quantity').unsigned()
      table.float('discount').unsigned()
      table.string('status')
      table.float('total')
      table.integer('paymenth_method').unsigned()



      table.timestamps('created_at')
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SaleSchema
