'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// const Database = user('Database')

class UserSeeder {
  async run () {
    // const users = Database.table('users')
    // console.log(users)
    const user = await Factory.model('App/Models/User').create()
  }
}

module.exports = UserSeeder
