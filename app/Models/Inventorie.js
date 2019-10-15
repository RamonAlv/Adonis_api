'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Inventorie extends Model {

    transaction(){
        return this.hasMany('App/Models/Transaction')
    }
    product(){
        return this.belongsTo('App/Models/Product') 
    }

    user(){
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Inventorie
