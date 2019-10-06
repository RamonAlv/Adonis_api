'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('inventory_id').unsigned().references('id').inTable('inventories')
      table.integer('type').unsigned()
      table.integer('quantity').unsigned()
      // table.date('date')
      table.text('description')

      table.timestamps('created_at')
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
