'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Inventorie extends Model {

    product(){
        return this.belongsTo('App/Models/Product') 
    }

    user(){
        return this.belongsTo('App/Models/User')
    }

    transaction(){
        return this.hasMany('App/Models/Transaction')
    }

}

module.exports = Inventorie
