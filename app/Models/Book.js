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
    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Book
