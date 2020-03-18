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

//route group for books
Route.group(() => {
  Route.post('/', 'BookController.store').middleware('auth')
  Route.get('/', 'BookController.index')
  Route.put('/:id', 'BookController.update')
}).prefix('api/test/book')

//route group for users
Route.group(() => {
  Route.post('/', 'UserController.store')
  Route.get('/', 'UserController.index')
  Route.post('/login', 'AuthController.login')
  Route.post('/attach', 'UserController.attachRole')
}).prefix('api/test/user')

//route group for roles
Route.group(() => {
  Route.post('/', 'RoleController.store')
  Route.get('/', 'RoleController.index')
  //Route.post('/login', 'AuthController.login')
}).prefix('api/test/role')
