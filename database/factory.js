'use strict'
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Chance = require('chance');
const fakerChance = new Chance();
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: fakerChance.first(),
    email : fakerChance.email(),
    password: await Hash.make(faker.password(1234)),
    rol: '1',
  }
})

Factory.blueprint('App/Models/Product', async (faker)=>{
    return{
        code: fakerChance.unique(fakerChance.integer,1,{min: 1000,max:10000}),
        name:fakerChance.word(),
        description:fakerChance.paragraph(),
        image:fakerChance.avatar({fileExtension:'jpg'}),
    }
})
