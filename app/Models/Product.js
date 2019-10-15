'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

    sale(){
        return this.hasMany('App/Models/Sale')
    }
    inventorie(){
        return this.hasMany('App/Models/Inventorie')
    }
}

module.exports = Product
