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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('api/v1/users','UserController').apiOnly().middleware('auth');
Route.resource('api/v1/inventories','InventorieController').apiOnly().middleware('auth');
Route.resource('api/v1/products','ProductController').apiOnly().middleware('auth');
Route.resource('api/v1/transactions','TransactionController').apiOnly().middleware('auth');
Route.resource('api/v1/sales','SaleController').apiOnly().middleware('auth');

Route.post('api/v1/login','UserController.login');
Route.post('api/v1/registre','UserController.store');