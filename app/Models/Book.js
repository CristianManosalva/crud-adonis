'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Book extends Model {
    static get table () {
        return 'books'
    }
    static get primaryKey() {
        return 'id'
    }
}

module.exports = Book
