'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const message = 'Resource not found'
const status = 404
const code = 'E_RESOURCE_NOT_FOUND'

class ResourceNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  constructor() {
    super(message, status, code)
    this.message = message
  }
}

module.exports = ResourceNotFoundException
