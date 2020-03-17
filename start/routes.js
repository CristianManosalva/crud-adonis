'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
//const BookController = use('App/Controllers/Http/BookController')

Route.get('/', () => {
    //const bookInfo = request.only(['title','isbn','publisher_name', 'authir'])
    return { greeting: 'Hello world in JSON' }
  })

Route.group(() => {
  Route.post('/', 'BookController.store')
  Route.get('/', 'BookController.index')
  Route.put('/:id', 'BookController.update')
}).prefix('api/test/book')

//() => {return { message: 'Getting books' }}