'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('inventorie_id').unsigned().references('id').inTable('inventories')
      table.integer('type').unsigned()
      table.integer('quantity').unsigned()
      table.text('description')

      table.timestamps('created_at')
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
