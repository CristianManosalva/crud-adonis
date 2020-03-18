'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    console.log('Codigo error ', error.code)
    console.log(error)
    if (error.code === 'E_JWT_TOKEN_EXPIRED') {
      return response
        .status(error.status)
        .send('Tu sesion ha expirado, debes iniciar nuevamente')
    }
    if (error.code === 'E_INVALID_JWT_TOKEN') {
      return response.status(error.status).send('Debes iniciar sesion')
    }
    if (error.status === 403) {
      return response
        .status(error.status)
        .send('No tienes permiso para realizar esta accion')
    }
    response.status(error.status).send(error.message + ' Funciono')
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler
