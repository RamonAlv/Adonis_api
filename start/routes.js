'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('api/v1/users','UserController').apiOnly().middleware('auth');
Route.resource('api/v1/inventories','InventorieController').apiOnly().middleware('auth');
Route.resource('api/v1/products','ProductController').apiOnly().middleware('auth');
Route.resource('api/v1/transactions','TransactionController').apiOnly().middleware('auth');
Route.resource('api/v1/sales','SaleController').apiOnly().middleware('auth');
/* --- Login Register No Auth --- */
Route.post('api/v1/login','UserController.login');
Route.post('api/v1/registre','UserController.store');