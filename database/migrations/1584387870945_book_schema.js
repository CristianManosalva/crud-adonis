'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.string('title').nullable()
      table.string('isbn').nullable()
      table.string('publisher_name').nullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BookSchema
